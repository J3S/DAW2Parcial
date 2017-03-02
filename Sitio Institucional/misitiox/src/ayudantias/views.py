from django.shortcuts import render


from .models import Ayudantia

# Create your views here.
def payudantia(request):
	queryset=Ayudantia.objects.all()

	context={
		"queryset":queryset,
	}

	return render(request, "payudantia.html", context)



	