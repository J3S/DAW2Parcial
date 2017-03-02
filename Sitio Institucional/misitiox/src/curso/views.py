from django.shortcuts import render

from .models import materia

# Create your views here.
def inicio(request):

	
	queryset=materia.objects.all()

	context={
		"queryset":queryset,
	}
	return render(request, "inicio.html", context)

