# Generated by Django 4.2.3 on 2024-05-10 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_ambulance_lati_ambulance_longi'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ambulance',
            name='lati',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='ambulance',
            name='longi',
            field=models.FloatField(),
        ),
    ]