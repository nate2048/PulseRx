from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    address = models.TextField()
    gender = models.TextField(default='F')


    def __str__(self):
        return f"Profile for {self.user.username}"

class BloodTest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Blood Test for {self.user.username} on {self.test_date}"
class BloodMarker(models.Model):
    blood_test = models.ForeignKey(BloodTest, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    value = models.FloatField()

    def __str__(self):
        return f"{self.name} for Blood Test on {self.blood_test.test_date}"


#options
