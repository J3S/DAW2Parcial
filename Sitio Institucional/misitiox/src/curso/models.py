from __future__ import unicode_literals

from django.db import models

# Create your models here.
 

class materia(models.Model):
	nombre= models.CharField(max_length=100)
	descripcion= models.CharField(max_length=100)
	requisitos= models.CharField(max_length=100, blank=True, null=True)
	codigo=  models.CharField(max_length=100)

	def __unicode__(self):
		return self.nombre

	def __str__(self):
		return self.nombre