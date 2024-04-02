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
        detail = [{"test_date": detail.test_date, "num": detail.num}
                  for detail in BloodTest.objects.filter(user=request.user)]
        return Response(detail)

    def post(self, request):
        selected_user = request.user

        # count the number of tests associated with a specific user
        num_tests = BloodTest.objects.filter(user=selected_user).count()

        # Make the next test number that value
        test_num = num_tests + 1

        data = {'test_num': test_num + 1}
        serializer = TestSerializer(data={"user": request.user.pk} | data)
        if serializer.is_valid(raise_exception=True):
            blood_test = serializer.save()
            return Response(blood_test.pk)


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
                'num': blood_test.num,
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


# def post(self, request):

#  serializer = TestSerializer(data=BloodTest.objects.filter(user=request.user))
# if serializer.is_valid(raise_exception=True):
#     serializer.save()
#    return Response(serializer.data)
