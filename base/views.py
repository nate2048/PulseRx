from django.shortcuts import render
from .models import BloodTest, BloodMarker

def view_dashboard(request):
    return render(request, 'base/dashboard.html')

def view_blood_test(request):
    blood_tests = BloodTest.objects.filter(user=request.user)

    blood_tests_list = []

    for i, blood_test in enumerate(blood_tests):

        test_data = {
            'user': blood_test.user,
            'blood_test_num': blood_test.test_id,
            'date': blood_test.test_date,
        }

        blood_tests_list.append(test_data)

    context = {'blood_tests_list': blood_tests_list}

    return render(request, 'base/bloodtests.html', context)


def view_blood_test_metrics(request, id):

    blood_tests = BloodTest.objects.filter(user=request.user)

    test = BloodTest.objects.get(id=id)

    blood_markers = BloodMarker.objects.filter(blood_test=test)

    blood_test_data = {
            'id': id,
            'date': test.test_date,
            'blood_markers': blood_markers,
        }

    context = {'markers': blood_test_data}

    return render(request, 'base/markers.html', context)




def view_complete_blood_tests(request):
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





