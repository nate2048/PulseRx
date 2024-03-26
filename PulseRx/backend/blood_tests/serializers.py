from rest_framework import serializers 
from .models import *



class TestSerializer(serializers.ModelSerializer): 
    
    class Meta: 
        model = BloodTest
        fields = ['user', 'test_date', 'num',]


class MarkerSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = BloodMarker 
        fields = ['blood_test', 'name', 'value']


class allMarkerSerialzier(serializers.Serializer):
    blood_markers = MarkerSerializer(many=True)