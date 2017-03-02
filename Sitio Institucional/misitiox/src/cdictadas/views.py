from django.shortcuts import render

# Create your views here.


from .models import CDictada

# Create your views here.
def pclases(request):
	

	queryset=CDictada.objects.all()

	context={
		"queryset":queryset,
	}

	return render(request, "pclases.html", context)






