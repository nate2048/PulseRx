from django.shortcuts import render
from django.views.generic.list import ListView
from .models import BloodTest


# Create your views here.


class dashboard(ListView):
    model = BloodTest



