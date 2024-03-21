from rest_framework import serializers 
from . models import *
  
class UserSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = UserProfile 
        fields = ['user', 'date_of_birth', 'sex', 'ethnicity']

class TestSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = BloodTest
        fields = ['user', 'test_date', 'id',]


class MarkerSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = BloodMarker 
        fields = ['blood_test', 'name', 'value']



