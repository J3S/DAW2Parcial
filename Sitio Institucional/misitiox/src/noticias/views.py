from django.shortcuts import render

# Create your views here.
from .models import Noticia
def pnoticias(request):
	
	return render(request, "pnoticias.html", {})

