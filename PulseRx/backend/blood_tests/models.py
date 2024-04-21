from django.db import models
from users_api.models import AppUser


class BloodTest(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    test_date = models.DateField()
    type = models.CharField(max_length=100, default="N/A")
    source = models.CharField(max_length=100, default="N/A")

    def __str__(self):
        return f"Blood Test {self.pk} for {self.user.username} on {self.test_date}"


class BloodMarker(models.Model):
    blood_test = models.ForeignKey(BloodTest, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    value = models.FloatField()

    def __str__(self):
        return f"{self.name} for Blood Test on {self.blood_test.test_date}"


class gptRecommendation(models.Model):
    blood_test = models.ForeignKey(BloodTest, on_delete=models.CASCADE)
    marker = models.CharField(max_length=50, default="N/A")
    high_low = models.CharField(max_length=10, default="N/A")
    prompt = models.TextField()
    response = models.TextField()

    def __str__(self):
        return f"ChatGPT response for {self.marker} for Blood Test on {self.blood_test.test_date}."
