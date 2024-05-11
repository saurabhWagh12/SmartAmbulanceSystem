# Generated by Django 4.2.3 on 2024-05-10 06:06

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Individual_Owner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('license', models.ImageField(upload_to='')),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None)),
                ('vehicle_number', models.CharField(max_length=20, validators=[django.core.validators.RegexValidator(message='Enter a valid vehicle number.', regex='^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$')])),
                ('type', models.CharField(choices=[('Advance_Life_Support', 'Advance Life Support'), ('Basic_Life_Support', 'Basic Life Support'), ('Patient_Transport', 'Patient Transport')], max_length=20)),
                ('cost', models.FloatField()),
                ('documents', models.ImageField(upload_to='')),
                ('workingStatus', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Fleet_Owner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None)),
                ('ambulanceCount', models.IntegerField(default=0)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None)),
                ('license', models.ImageField(upload_to='')),
                ('underFleet', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app.fleet_owner')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Ambulance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicle_number', models.CharField(max_length=20, validators=[django.core.validators.RegexValidator(message='Enter a valid vehicle number.', regex='^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$')])),
                ('type', models.CharField(choices=[('Advance_Life_Support', 'Advance Life Support'), ('Basic_Life_Support', 'Basic Life Support'), ('Patient_Transport', 'Patient Transport')], max_length=20)),
                ('cost', models.FloatField()),
                ('documents', models.ImageField(upload_to='')),
                ('workingStatus', models.BooleanField(default=False)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.fleet_owner')),
            ],
        ),
    ]