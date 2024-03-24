from django.contrib import admin
from .models import BloodTest, BloodMarker

admin.site.register(BloodTest)
admin.site.register(BloodMarker)