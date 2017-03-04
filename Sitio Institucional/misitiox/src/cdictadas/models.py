from __future__ import unicode_literals

from django.db import models

# Create your models here.
 

class CDictada(models.Model):
	nombre= models.CharField(max_length=100)
	semana= models.CharField(max_length=100)
	link= models.URLField()
	def __unicode__(self):
		return self.nombre

	def __str__(self):
		return self.nombre

