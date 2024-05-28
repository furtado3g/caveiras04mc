from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate


# Create your views here.
def login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            return redirect(to="/home")
        else:
            context = {"error": "Usuário ou senha inválidos"}
            return render(request, "login.html", context)
    if request.user.is_authenticated:
        return redirect(to="/home")
    return render(request, "login.html")


@login_required(login_url="/login")
def home(request):
    return render(request, "home.html")
