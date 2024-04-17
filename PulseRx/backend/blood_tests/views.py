from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from openai import OpenAI

from .models import *
from users_api.models import AppUser
from PulseRx.settings import OPENAI_API_KEY
from .serializers import *


class BloodTestView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    serializer_class = TestSerializer

    def get(self, request):
        detail = [{"pk": detail.pk, "test_date": detail.test_date, "type": detail.type, "source": detail.source}
                  for detail in BloodTest.objects.filter(user=request.user)]
        return Response(detail)

    def post(self, request):

        serializer = TestSerializer(data={"user": request.user.pk} | request.data)
        if serializer.is_valid(raise_exception=True):
            blood_test = serializer.save()
            return Response(blood_test.pk)
        
    
class UpdateTestView(APIView):

    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    serializer_class = TestSerializer

    def put(self, request, testId):
        serializer = TestSerializer(data={"user": request.user.pk} | request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, testId):
        test = BloodTest.objects.get(user=request.user, pk=testId)
        test.delete()
        return Response("Deleted!")


class TestAndMarkerView(APIView):
    # returns a data structure with each marker and the value from each test
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    serializer_class = MarkerSerializer

    def get(self, request):
        selected_user = request.user

        # Filter BloodMarker based on logged in user
        blood_markers = BloodMarker.objects.filter(blood_test__user=selected_user).select_related('blood_test')

        # Filter BloodMarker queryset for the selected user
        blood_markers = BloodMarker.objects.filter(blood_test__user=selected_user).select_related('blood_test')

        data = {}

        # Iterate through blood markers and populate the data dictionary
        for marker in blood_markers:
            blood_test = marker.blood_test
            blood_test_info = {
                'test_date': blood_test.test_date,
                'num': blood_test.pk,
                'val': marker.value
            }

            if marker.name in data:
                data[marker.name]['tests'].append(blood_test_info)


            else:
                data[marker.name] = {
                    'tests': [blood_test_info]
                }

        return Response(data)

    def post(self, request):
        serializer = MarkerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        


class MarkerForTestView(APIView):
    # returns a data structure with test as key and an associated dictionary of markers
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    serializer_class = MarkerSerializer

    def get(self, request):
        selected_user = request.user

        # Filter BloodMarker based on logged in user
        blood_markers = BloodMarker.objects.filter(blood_test__user=selected_user)

        data = {}

        # Iterate through blood markers and populate the data dictionary
        for marker in blood_markers:
            blood_test = marker.blood_test

            formated_dict = {
                'name': marker.name,
                'value': marker.value,
            }

            if blood_test.pk in data:
                data[blood_test.pk].append(formated_dict)

            else:
                 data[blood_test.pk] = [formated_dict]

        return Response(data)
    

class gptResponseView(APIView):
    
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    serializer_class = gptRecommendationSerializer

    def get(self, request):

        data = {}

        for test in BloodTest.objects.filter(user=request.user):

            try:
                recomendation = gptRecommendation.objects.filter(blood_test=test.pk)

                # Iterate through blood markers and populate the data dictionary
                for rec in recomendation:
                    
                    info = {
                        "marker" : rec.marker,
                        "high_low" : rec.high_low,
                        "response": rec.response,
                    }

                    if test.pk in data:
                        data[test.pk].append(info)


                    else:
                        data[test.pk] = [info]

            except Exception as e:
                data[test.pk] = [{"marker" : "N/A", "high_low" : "N/A", "response": "No ChatGPT response. Error: " + str(e)}]


        return Response(data)
    


class gptNewResponseView(APIView):
    
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    serializer_class = gptRecommendationSerializer

    normal_ranges = {
            'glucose': (70, 100),
            'cholesterol_total': (125, 200),
            'cholesterol_hdl': (40, 60),  # HDL cholesterol in mg/dL, higher is generally better
            'cholesterol_ldl': (0, 100),  # LDL cholesterol in mg/dL, lower is generally better
            'triglycerides': (0, 150),  # Triglycerides level in mg/dL, lower is generally better
            'hemoglobin': (13.5, 17.5),  # Hemoglobin level in g/dL (varies by gender)
            'hematocrit': (38.3, 48.6),  # Hematocrit percentage (varies by gender)
            'mcv': (80, 100),  # Mean Corpuscular Volume in fL (femtoliters)
            'mch': (27, 33),  # Mean Corpuscular Hemoglobin in picograms
            'mchc': (32, 36),  # Mean Corpuscular Hemoglobin Concentration in g/dL
            'rdw': (11, 15),  # Red Cell Distribution Width in %
            'platelets': (150, 450),  # Platelets count x10^3 per µL
            'wbc': (3.4, 9.6),  # White Blood Cells count x10^3 per µL
            'neutrophils': (40, 60),  # Percentage of neutrophils in total WBC
            'lymphocytes': (20, 40),  # Percentage of lymphocytes in total WBC
            'monocytes': (2, 8),  # Percentage of monocytes in total WBC
            'eosinophils': (1, 4),  # Percentage of eosinophils in total WBC
            'basophils': (0.5, 1),  # Percentage of basophils in total WBC
        }

    def post(self, request, testId):

        user = AppUser.objects.get(pk=request.user.pk)
        blood_markers = BloodMarker.objects.filter(blood_test=testId)
        blood_test = BloodTest.objects.get(pk=testId)

        oor = self.getBadMarkers(blood_markers)

        responses = []

        if not oor:
            prompt = self.inRangePrompt(user)
            recommendation = self.getRecommendation(prompt)
            json_response = {
                "blood_test": testId,
                "marker": "N/A",
                "high_low": "N/A",
                "prompt": prompt,
                "response": recommendation,
            }
            responses.append(json_response)
            
        else:
            for marker, quantity in oor.items():
                prompt = self.createPrompt(user, marker, quantity, blood_test.type)
                recommendation = self.getRecommendation(prompt)
                json_response = {
                    "blood_test": testId,
                    "marker": marker,
                    "high_low": quantity,
                    "prompt": prompt,
                    "response": recommendation,
                }
                responses.append(json_response)

        serializer = gptRecommendationSerializer(data=responses, many=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    

    def getBadMarkers(self, blood_markers):

        oor = {}

        for marker in blood_markers:

            if marker.name.lower() in self.normal_ranges: 

                low = self.normal_ranges[marker.name.lower()][0]
                high = self.normal_ranges[marker.name.lower()][1]

                if marker.value < low:
                    oor[marker.name] = "low"

                elif marker.value > high:
                    oor[marker.name] = "high"

            else: 
                continue  

        return oor
    
    def createPrompt(self, user, marker, quantity, type):

        prompt = f"I am a {user.age} year old {user.sex}. My {type} test results shows that I have {quantity} {marker}."
        prompt += f"\nBased on my demographics and {type} test results, what dietary and lifestyle changes would you suggest?"

        return prompt

    def inRangePrompt(self, user):

        prompt = f"I am a {user.age} year old {user.sex}. "
        prompt += "I am looking to improve my health so what dietary and lifestyle changes would you suggest?"

        return prompt

    
    def getRecommendation(self, prompt):

        client = OpenAI(api_key=OPENAI_API_KEY)
    
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a healthcare worker and provide helpful advice based on patient's blood test results."},
                    {"role": "user", "content": prompt}
                ]
            )

            if response.choices:
                return response.choices[0].message.content.strip()
            else:
                return Response("No recommendations available.")
            
        except Exception as e:
            return Response(f"Error calling OpenAI API: {e}")


    # def createPrompt(self, user, oor, type):

    #     i = 0
    #     prompt = f"I am a {user.age} year old {user.sex}. "
        
    #     if not oor:
    #         prompt += "I am looking to improve my health so what dietary and lifestyle changes would you suggest?"

    #     else:
    #         prompt += f"My {type} test results shows that they have " 

    #         for marker, quantity in oor.items():
    #             if i == 0: 
    #                 prompt += f"{quantity} {marker}"
    #             elif i-1 == oor.length() and oor.length() != 1:
    #                 prompt += f", and {quantity} {marker}."
    #             else:
    #                 prompt += f", {quantity} {marker}"

    #         prompt += f"\nBased on my demographics and {type} test results, what dietary and lifestyle changes would you suggest?"

    #     return prompt