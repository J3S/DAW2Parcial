from django.shortcuts import render

# Create your views here.
from .models import Noticia
def pnoticias(request):
	
	

	queryset=Noticia.objects.all()

	context={
		"queryset":queryset,
	}

	return render(request, "pnoticias.html", context)

	