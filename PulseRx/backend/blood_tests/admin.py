from django.contrib import admin
from .models import BloodTest, BloodMarker, gptRecommendation

admin.site.register(BloodTest)
admin.site.register(BloodMarker)
admin.site.register(gptRecommendation)