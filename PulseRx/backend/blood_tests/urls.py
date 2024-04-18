from django.urls import path
from . import views

urlpatterns = [
	path('tests', views.BloodTestView.as_view(), name='test'),
	path('markers', views.TestAndMarkerView.as_view(), name='markers'),
    path('markers/all', views.MarkerForTestView.as_view(), name='markers/test'),
	path('tests/update/<int:testId>', views.UpdateTestView.as_view(), name='delete'),
]