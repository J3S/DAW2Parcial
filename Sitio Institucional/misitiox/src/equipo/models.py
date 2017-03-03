from __future__ import unicode_literals

from django.db import models

# Create your models here.
 

class Profesor(models.Model):
	nombre= models.CharField(max_length=100)
	correo= models.EmailField()
	oficina= models.CharField(max_length=100, blank=True, null=True)
	paralelos=  models.CharField(max_length=100)
	foto= models.FileField()
	def __unicode__(self):
		return self.nombre

	def __str__(self):
		return self.nombre

class Coordinador(models.Model):
	nombre= models.CharField(max_length=100)
	correo= models.EmailField()
	oficina= models.CharField(max_length=100, blank=True, null=True)
	foto= models.FileField()
	def __unicode__(self):
		return self.nombre

	def __str__(self):
		return self.nombre
	

class AyudanteDeberes(models.Model):
	nombre= models.CharField(max_length=100)
	correo= models.EmailField()
	horario=models.CharField(max_length=100, blank=True, null=True)
	foto= models.FileField()
	def __unicode__(self):
		return self.nombre

	def __str__(self):
		return self.nombre

class AyudanteAcademico(models.Model):
	nombre= models.CharField(max_length=100)
	correo=models.EmailField()
	foto= models.FileField()
	def __unicode__(self):
		return self.nombre

	def __str__(self):
		return self.nombre
	
