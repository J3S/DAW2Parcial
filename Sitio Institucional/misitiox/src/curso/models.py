from __future__ import unicode_literals

from django.db import models

# Create your models here.
 

class materia(models.Model):
	nombre= models.CharField(max_length=100)
	descripcion= models.CharField(max_length=500)
	requisitos= models.CharField(max_length=500, blank=True, null=True)
	codigo=  models.CharField(max_length=500)
	objetivosG= models.CharField(max_length=500, blank=True, null=True)
	objetivosE= models.CharField(max_length=500, blank=True, null=True)
	temas= models.CharField(max_length=500, blank=True, null=True)
	escenarios= models.CharField(max_length=500, blank=True, null=True)
	recursos= models.CharField(max_length=500, blank=True, null=True)
	bibliografia= models.CharField(max_length=500, blank=True, null=True)
	politicas= models.CharField(max_length=500, blank=True, null=True)
	def __unicode__(self):
		return self.nombre

	def __str__(self):
		return self.nombre