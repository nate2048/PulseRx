from django.urls import path, include
from .views import view_complete_blood_tests, view_dashboard, view_blood_test, view_blood_test_metrics


urlpatterns = [
    path('', view_dashboard, name='dashboard'),
    path('blood-tests/', view_blood_test, name='dashboard'),
    path('blood-tests/<id>/', view_blood_test_metrics, name='dashboard'),
    path('complete-blood-tests/', view_complete_blood_tests, name='view_blood_tests'),
]



