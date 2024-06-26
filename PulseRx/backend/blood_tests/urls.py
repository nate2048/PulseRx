from django.urls import path
from . import views

urlpatterns = [
	path('tests', views.BloodTestView.as_view(), name='test'),
	path('markers', views.TestAndMarkerView.as_view(), name='markers'),
    path('gpt', views.gptResponseView.as_view(), name='gpt'),
    path('gpt/<int:testId>', views.gptNewResponseView.as_view(), name='gpt'),
    path('markers/all', views.MarkerForTestView.as_view(), name='markers/test'),
	path('tests/update/<int:testId>', views.UpdateTestView.as_view(), name='delete'),
]