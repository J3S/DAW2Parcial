# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-03-02 01:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CDictada',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('semana', models.CharField(max_length=100)),
                ('link', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
    ]
