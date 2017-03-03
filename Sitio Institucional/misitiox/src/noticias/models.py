from __future__ import unicode_literals

from django.db import models

# Create your models here.
 

class Noticia(models.Model):
	nombre= models.CharField(max_length=500)
	descripcion= models.CharField(max_length=500)
	timestamp=models.DateTimeField(auto_now_add=True,auto_now=False)
	
	def __unicode__(self):
		return self.nombre

	def __str__(self):
		return self.nombre
