# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-03-03 18:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cdictadas', '0002_auto_20170302_0154'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cdictada',
            name='link',
            field=models.FileField(upload_to=''),
        ),
    ]
