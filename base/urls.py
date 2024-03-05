from django.urls import path, include
from .views import view_blood_tests


urlpatterns = [
    path('blood-tests/', view_blood_tests, name='view_blood_tests'),
    path('', view_blood_tests, name='dashboard'),
]



