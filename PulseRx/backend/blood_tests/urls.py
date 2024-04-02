from django.urls import path
from . import views

urlpatterns = [
	path('tests', views.BloodTestView.as_view(), name='test'),
	path('markers', views.TestAndMarkerView.as_view(), name='markers'),
	#path('login', views.UserLogin.as_view(), name='login'),
]