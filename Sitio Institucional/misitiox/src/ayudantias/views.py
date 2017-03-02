from django.shortcuts import render


from .models import Ayudantia

# Create your views here.
def payudantia(request):
	return render(request, "payudantia.html", {})

