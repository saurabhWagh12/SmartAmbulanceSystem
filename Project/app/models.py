from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import RegexValidator
# Create your models here.

vehicle_number_regex = r'^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$'

vehicle_number_validator = RegexValidator(
        regex=vehicle_number_regex,
        message="Enter a valid vehicle number."
    )

class Fleet_Owner(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=False,blank=False)
    phone_number = PhoneNumberField(null=False,blank=False)
    ambulanceCount = models.IntegerField(default=0)
    def __str__(self):
        return self.user.username

class Driver(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=False,blank=False)
    phone_number = PhoneNumberField(null=False,blank=False)
    license = models.FileField(upload_to='liscance/',null=False,blank=False)
    underFleet = models.ForeignKey(Fleet_Owner,on_delete=models.CASCADE,null=True,blank=True,default=None)
    busy = models.BooleanField(default=False)
    loggedIn = models.BooleanField(default=False)
    def __str__(self):
        return self.user.username
    
AMBULANCE_TYPES = (
        ('Advance Life Support', 'Advance Life Support'),
        ('Basic Life Support', 'Basic Life Support'),
        ('Patient Transport', 'Patient Transport'),
    )

class Ambulance(models.Model):    
    owner = models.ForeignKey(Fleet_Owner,on_delete=models.CASCADE,null=False,blank=False)
    vehicle_number = models.CharField(max_length=20,validators=[vehicle_number_validator],null=False,blank=False,unique=True)
    type = models.CharField(max_length=20, choices=AMBULANCE_TYPES, null=False, blank=False)
    cost = models.FloatField(null=False,blank=False)
    documents = models.FileField(upload_to='ambulance_documents/', null=False, blank=False)
    workingStatus = models.BooleanField(default=False)
    city = models.CharField(max_length=100,null=False,blank=False)
    longi = models.FloatField(default=0.0,null=True,blank=True)
    lati = models.FloatField(default=0.0,null=True,blank=True)

    def __str__(self):
        return self.vehicle_number


class Individual_Owner(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=False,blank=False)
    license = models.FileField(upload_to='liscance/',null=False,blank=False)
    phone_number = PhoneNumberField(null=False,blank=False)
    vehicle_number = models.CharField(max_length=20,validators=[vehicle_number_validator],null=False,blank=False,unique=True)
    type = models.CharField(max_length=20, choices=AMBULANCE_TYPES, null=False, blank=False)
    cost = models.FloatField()
    documents = models.FileField(upload_to='ambulance_documents/', null=False, blank=False)
    workingStatus = models.BooleanField(default=False)
    city = models.CharField(max_length=100,null=False,blank=False)
    def __str__(self):
        return self.user.username


class Order(models.Model):
    ambulance = models.ForeignKey(Ambulance,on_delete=models.CASCADE,null=False,blank=False)
    amount = models.FloatField(null=True,blank=True)
    date = models.DateTimeField(auto_now_add=True)
    completionStatus = models.BooleanField(default=False)
    startLongi = models.FloatField(blank=True,null=True)
    startLati = models.FloatField(blank=True,null=True)
    endLongi = models.FloatField(blank=True,null=True)
    endLati = models.FloatField(blank=True,null=True)

class Assigned(models.Model):
    driver = models.OneToOneField(Driver,null=False,blank=False,on_delete=models.CASCADE)
    ambulance = models.OneToOneField(Ambulance,null=False,blank=False,on_delete=models.CASCADE)
    
class Request(models.Model):
    startLongi = models.FloatField()
    startLati = models.FloatField()
    endLongi = models.FloatField()
    endLati = models.FloatField()

