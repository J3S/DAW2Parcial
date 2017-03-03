from django.shortcuts import render


from .models import Ayudantia

# Create your views here.
def payudantias(request):
	queryset=Ayudantia.objects.all()

	context={
		"queryset":queryset,
	}

	return render(request, "payudantias.html", context)



	