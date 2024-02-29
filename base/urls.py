from django.urls import path
from .views import dashboard


urlpatterns = [

    path('', dashboard.as_view(), name='dashboard')

]



