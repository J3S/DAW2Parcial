from django.shortcuts import render

# Create your views here.


from .models import Profesor
from .models import Coordinador
from .models import AyudanteDeberes
from .models import AyudanteAcademico


# Create your views here.
def pequipo(request):

	queryset=Profesor.objects.all()

	context={
		"queryset":queryset,
	}
	
	return render(request, "pequipo.html", context)


def pcoordinador(request):

	queryset=Coordinador.objects.all()

	context={
		"queryset":queryset,
	}
	
	return render(request, "pcoordinador.html", context)

def payudantesd(request):

	queryset=AyudanteDeberes.objects.all()

	context={
		"queryset":queryset,
	}
	
	return render(request, "payudantesd.html", context)

	
def payudantesa(request):

	queryset=AyudanteAcademico.objects.all()

	context={
		"queryset":queryset,
	}
	
	return render(request, "payudantesa.html", context)

	