from app.models import *
from rest_framework import serializers
from app.models import *

class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password'] 
        depth = 1

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'

class Fleet_OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fleet_Owner
        fields = '__all__'

class Individual_OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Individual_Owner
        fields = '__all__'

class AmbulanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambulance
        fields = '__all__'     