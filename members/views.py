from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from .forms import RegisterUserForm, UserProfileForm
from base.models import UserProfile
from django.contrib.auth.decorators import login_required

@login_required(login_url="/login_user/")
def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.success(request, ("There was an error logging in, try again"))
            return redirect('login_user/')

    return render(request, "authenticate/login.html", {})

def logout_user(request):

    logout(request)
    messages.success(request, ("User logged out successfully"))
    return redirect('home')


def register_user(request):

    form = RegisterUserForm()
    userProfile = UserProfileForm()

    if request.method == 'POST':

        form = RegisterUserForm(request.POST)
        userProfile = UserProfileForm(request.POST)

        if form.is_valid() and userProfile.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, ("Registration successful"))
            userProfileObj = UserProfile.objects.create(
                user = user,
                date_of_birth = userProfile.cleaned_data.get('date_of_birth'),
                sex = userProfile.cleaned_data.get('sex'),
                ethnicity = userProfile.cleaned_data.get('ethnicity'),
            )
            return redirect('home')
        
        else:
            form = RegisterUserForm(request.POST)

    


    return render(request, "authenticate/register_user.html", {'form': form, 'userProfile': userProfile})