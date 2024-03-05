from django.shortcuts import render
from .models import BloodTest, BloodMarker


def view_blood_tests(request):
    blood_tests = BloodTest.objects.filter(user=request.user)

    # Creates a list to store dictionaries of tests and associated markers
    blood_tests_with_markers = []

    # Iterates through each test and gets blood markers
    for blood_test in blood_tests:
        blood_markers = BloodMarker.objects.filter(blood_test=blood_test)

        # dictionary with blood tests and markers
        blood_test_data = {
            'blood_test': blood_test,
            'blood_markers': blood_markers,
        }

        # list of all the dictionaries
        blood_tests_with_markers.append(blood_test_data)


    context = {'blood_tests_with_markers': blood_tests_with_markers}

    return render(request, 'base/bloodtest_list.html', context)





