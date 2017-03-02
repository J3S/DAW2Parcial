from django.shortcuts import render

from .models import materia

# Create your views here.
def inicio(request):
	titulo="Fundamentos de Programación" 

	context={
		"titulo":titulo,
	}




	return render(request, "inicio.html", context)

