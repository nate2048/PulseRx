from django.shortcuts import render
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from .models import *
from .serializers import *


class BloodTestView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    serializer_class = TestSerializer

    def get(self, request):
        detail = [{"test_date": detail.test_date, "num": detail.id}
                  for detail in BloodTest.objects.filter(user=request.user)]
        return Response(detail)

    def post(self, request):
        serializer = TestSerializer(data={"user": request.user.pk} | request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class TestAndMarkerView(APIView):
    # returns a data strcuture with each marker and the value from each test
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    serializer_class = MarkerSerializer

    def get(self, request):
        selected_user = request.user

<<<<<<< HEAD

        # Filter BloodMarker based on logged in user
        blood_markers = BloodMarker.objects.filter(blood_test__user=selected_user).select_related('blood_test')



        # Filter BloodMarker queryset for the selected user
        blood_markers = BloodMarker.objects.filter(blood_test__user=selected_user).select_related('blood_test')



=======
        # Filter BloodMarker based on logged in user
        blood_markers = BloodMarker.objects.filter(blood_test__user=selected_user).select_related('blood_test')


>>>>>>> 9fd0f288 (markers)
        data = {}

        # Iterate through blood markers and populate the data dictionary
        for marker in blood_markers:
            blood_test = marker.blood_test
            blood_test_info = {
                'test_date': blood_test.test_date,
                'num': blood_test.num,
                'val': marker.value
            }


<<<<<<< HEAD

            if marker.name in data:
                data[marker.name]['tests'].append(blood_test_info)



            if marker.name in data:
                data[marker.name]['tests'].append(blood_test_info)


=======
            if marker.name in data:
                data[marker.name]['tests'].append(blood_test_info)

>>>>>>> 9fd0f288 (markers)
            else:
                data[marker.name] = {
                    'tests': [blood_test_info]
                }


<<<<<<< HEAD

=======
>>>>>>> 9fd0f288 (markers)
        return Response(data)

# def post(self, request):

#  serializer = TestSerializer(data=BloodTest.objects.filter(user=request.user))
# if serializer.is_valid(raise_exception=True):
#     serializer.save()
#    return Response(serializer.data)
