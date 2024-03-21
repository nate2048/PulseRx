from django.urls import path, include
from .views import *


urlpatterns = [
    path('', view_dashboard, name='home'),
    path('blood-tests/', BloodTestView.as_view(), name='dashboard'),
    path('blood-tests/<id>/', view_blood_test_metrics, name='dashboard'),
    path('complete-blood-tests/', view_complete_blood_tests, name='view_blood_tests'),
]



