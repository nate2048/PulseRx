from django.db.models import Max
from django.shortcuts import render
from django.utils.decorators import method_decorator
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from .models import *
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
    # returns a data structure with each marker and the value from each test
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



