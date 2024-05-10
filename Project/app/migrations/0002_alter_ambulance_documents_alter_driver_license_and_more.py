# Generated by Django 4.2.3 on 2024-05-10 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ambulance',
            name='documents',
            field=models.FileField(upload_to='ambulance_documents/'),
        ),
        migrations.AlterField(
            model_name='driver',
            name='license',
            field=models.FileField(upload_to='liscance/'),
        ),
        migrations.AlterField(
            model_name='individual_owner',
            name='documents',
            field=models.FileField(upload_to='ambulance_documents/'),
        ),
        migrations.AlterField(
            model_name='individual_owner',
            name='license',
            field=models.FileField(upload_to='liscance/'),
        ),
    ]
