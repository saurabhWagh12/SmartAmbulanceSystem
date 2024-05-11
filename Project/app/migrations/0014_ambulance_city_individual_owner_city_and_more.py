# Generated by Django 4.2.3 on 2024-05-10 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_alter_ambulance_lati_alter_ambulance_longi'),
    ]

    operations = [
        migrations.AddField(
            model_name='ambulance',
            name='city',
            field=models.CharField(default='nagpur', max_length=100),
        ),
        migrations.AddField(
            model_name='individual_owner',
            name='city',
            field=models.CharField(default='nagpur', max_length=100),
        ),
        migrations.AlterField(
            model_name='ambulance',
            name='lati',
            field=models.FloatField(blank=True, default=0.0, null=True),
        ),
        migrations.AlterField(
            model_name='ambulance',
            name='longi',
            field=models.FloatField(blank=True, default=0.0, null=True),
        ),
    ]