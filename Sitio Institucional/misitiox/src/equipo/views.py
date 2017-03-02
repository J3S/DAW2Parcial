from django.shortcuts import render

# Create your views here.


from .models import Profesor
from .models import Coordinador
from .models import AyudanteDeberes
from .models import AyudanteAcademico


# Create your views here.
def pequipo(request):
	
	return render(request, "pequipo.html", {})

