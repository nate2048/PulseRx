from django.contrib import admin
from .models import BloodTest, BloodMarker, UserProfile



admin.site.register(BloodTest)
admin.site.register(BloodMarker)
admin.site.register(UserProfile)

# Register your models here.
