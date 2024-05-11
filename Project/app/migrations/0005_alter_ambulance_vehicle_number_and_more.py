# Generated by Django 4.2.3 on 2024-05-10 12:21

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_alter_driver_underfleet'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ambulance',
            name='vehicle_number',
            field=models.CharField(max_length=20, unique=True, validators=[django.core.validators.RegexValidator(message='Enter a valid vehicle number.', regex='^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$')]),
        ),
        migrations.AlterField(
            model_name='individual_owner',
            name='vehicle_number',
            field=models.CharField(max_length=20, unique=True, validators=[django.core.validators.RegexValidator(message='Enter a valid vehicle number.', regex='^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$')]),
        ),
    ]