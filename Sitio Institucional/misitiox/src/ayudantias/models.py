from django.db import models

# Create your models here.
class Ayudantia(models.Model):
	ayudante= models.CharField(max_length=100)
	aula= models.CharField(max_length=100)
	edificio= models.CharField(max_length=100, blank=True, null=True)
	coordenada= models.CharField(max_length=100)
	ordenada= models.CharField(max_length=100, blank=True, null=True)
	
	def __unicode__(self):
		return self.ayudante

	def __str__(self):
		return self.ayudante