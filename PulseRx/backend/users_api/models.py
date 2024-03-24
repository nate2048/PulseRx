from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
	def create_user(self, username, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(username=username, email=email)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, username, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(username, email, password)
		user.is_superuser = True
		user.is_staff = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	SEX_CHOICES = (
        ('F', 'Female',),
        ('M', 'Male',),
    )
	ETHNIC_CHOICES = [
    ('Black', 'Black'),
    ('White', 'White'),
    ('Other', 'Other'),
    ]

	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)
	age = models.IntegerField(default=21)
	sex = models.CharField(max_length=1,default='F',choices=SEX_CHOICES)
	ethnicity = models.CharField(choices=ETHNIC_CHOICES, default="black", max_length=20)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
	def __str__(self):
		return self.username