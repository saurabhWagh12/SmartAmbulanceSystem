# Generated by Django 4.2.3 on 2024-05-10 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_driver_busy'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ambulance',
            name='type',
            field=models.CharField(choices=[('Advance Life Support', 'Advance Life Support'), ('Basic Life Support', 'Basic Life Support'), ('Patient Transport', 'Patient Transport')], max_length=20),
        ),
    ]
