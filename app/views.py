from django.shortcuts import render,redirect


# Create your views here.
def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

    if request.user.is_authenticated:
        return redirect(to='/home')
    return render(request, 'login.html')
