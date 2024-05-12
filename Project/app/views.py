from rest_framework.response import Response
from rest_framework.decorators import api_view,APIView
from serializer import *
from django.contrib.auth import authenticate
import jwt
import datetime
from datetime import datetime, timezone
from dateutil.relativedelta import relativedelta
# Create your views here.

def createUser(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user, created = User.objects.get_or_create(
            username=serializer.validated_data['username'],
            defaults={'email': serializer.validated_data['email']}
        )
        if created:
            user.set_password(serializer.validated_data['password'])
            user.save()
            return user
    return None

@api_view(['POST'])
def registerDriver(request):
    try:
        user = createUser(request)
        if user is None:
            return Response({'status': 400, 'message': 'User Already Exists'})

        if 'phone_number' in request.data and 'licence' in request.FILES:
            phone_number = request.data['phone_number']
            licence_file = request.FILES['licence']

            # Create the Driver object and save it
            driver = Driver.objects.create(
                user=user,
                underFleet=Fleet_Owner.objects.get(user=User.objects.get(username=request.data['underFleet'])), 
                phone_number=phone_number,
                license=licence_file, 
            )
            driver.save()
            return Response({'status': 200, 'message': 'Driver Data Saved Successfully'})
        else:
            user.delete()
            return Response({'status': 400, 'message': 'Missing phone_number or licence in request'})
    except Exception as e:
        user.delete()
        return Response({'status': 400, 'message': str(e)})


@api_view(['POST'])
def registerFleetOwner(request):
    try:
        user = createUser(request)
        if user is None:
            return Response({'status':400,'message':'User Already Exists'})
        fleet = Fleet_Owner(user=user,phone_number = request.data['phone_number'])
        fleet.save()
        return Response({'status':200,'message':'FleetOwner Data Saved Successfully'})

    except Exception as e:
        user.delete()
        return Response({'status':400,'message':str(e)})


@api_view(['POST'])
def registerIndividual(request):
    try:
        user = createUser(request)
        # print(request.data)
        if user is None:
            return Response({'status':400,'message':'User Already Exists'})
        # if 'phone_number' in request.data and 'license' in request.FILES and 'vehicle_number' in request.data and 'documents' in request.FILES and 'cost' in request.data and 'type' in request.data:
        if True:
            phone_number = request.data['phone_number']
            licence_file = request.FILES['licence']
            docs = request.FILES['documents']
            indi = Individual_Owner(user=user,phone_number=phone_number,license=licence_file,vehicle_number=request.data['vehicle_number'],cost=request.data['cost'],type=request.data['type'],documents=docs,city=str(request.data['city']).lower())
            indi.save()
            return Response({'status':200,'message':'Individual Owner Created Successfully'})
        else:
            user.delete()
            return Response({'status':400,'message':'Missing Information'})
    except Exception as e:
        user.delete()
        return Response({'status':400,'message':str(e)})


class LoginAPI(APIView):
    def post(self, request):
        try:
            data = request.data
            username = data.get('username')
            password = data.get('password')
            
            credentials = UserSerializer(data={'username':username,'password':password})
            
            if not credentials.is_valid():
                print(credentials.data)
                return Response({'status': 400, 'message': 'Invalid Credentials'})
            
            user = authenticate(username=credentials.data['username'], password=credentials.data['password'])

            if user is not None:

                try:
                    Fleet_Owner.objects.get(user=user)
                    type = 'Fleet_Owner'
                except Fleet_Owner.DoesNotExist:
                    try:
                        Driver.objects.get(user=user)
                        type = 'Driver'
                    except Driver.DoesNotExist:
                        try:
                            Individual_Owner.objects.get(user=user)
                            type = 'Individual_Owner'
                        except Individual_Owner.DoesNotExist:
                            return Response({'status':400,'message':'Invalid User'})
                        


                # Create a JWT token
                now = datetime.now(timezone.utc)

                # Use relativedelta for 1440 minutes
                # expiration_time = now + relativedelta(minutes=1440)

                # Use expiration_time in your payload
                payload = {
                    'id': user.id,
                    'type':type,
                    'iat': now
                }

                token = jwt.encode(payload, 'secret', algorithm='HS256')
                response = Response({'status': 200, 'token': token,'type':type})

                # Set the token as a cookie in the response
                # response.set_cookie(key='token', value=token)
                return response
            else:
                return Response({'status': 400, 'message': 'Invalid Credentials'})

        except Exception as e:
            return Response({'status': 400, 'message': 'Error: ' + str(e)})


@api_view(['POST'])
def userDetails(request):
    try:
        token = request.data['token']
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserInfoSerializer(user)  
        return Response({'status': 200, 'data': serializer.data,'type':payload['type']})  

    except Exception as e:
        return Response({'status': 400, 'message': 'Error: ' + str(e)})
    
@api_view(['POST'])
def addFleetForDriver(request):
    try:
        try:
            user = User.objects.get(username=request.data['username'])
        except User.DoesNotExist:
            return Response({'status': 400, 'message': 'User not found'})
        try:
            fleet = Fleet_Owner.objects.get(user=User.objects.get(username=request.data['underFleet']))
            driver = Driver.objects.get(user=user)
            driver.underFleet = fleet
            driver.save()
            return Response({'status':200,'message':'Successfully updated Fleet-Owner for Driver'})
        except (User.DoesNotExist, Fleet_Owner.DoesNotExist, Driver.DoesNotExist):
            return Response({'status':400,'message':'Does Not Exist - exception'}) 
            
    except Exception as e:
        return Response({'status': 400, 'message': 'Error: ' + str(e)})


@api_view(['POST'])
def getDriverDetails(request):
    data = request.data['username']
    try:
        driver = Driver.objects.get(user=User.objects.get(username=data))
        serializer = DriverSerializer(driver)  
        return Response({'status':200,'data':serializer.data})
    except (Driver.DoesNotExist, User.DoesNotExist):  
        return Response({'status': 400, 'message': 'Error: Does Not Exist'})


@api_view(['POST'])
def getFleetDetails(request):
    data = request.data['username']
    try:
        fleet = Fleet_Owner.objects.get(user=User.objects.get(username=data))
        serializer = Fleet_OwnerSerializer(fleet)  
        return Response({'status':200,'data':serializer.data})
    except (Fleet_Owner.DoesNotExist, User.DoesNotExist):  
        return Response({'status': 400, 'message': 'Error: Does Not Exist'})

@api_view(['POST'])
def getIndividualDetails(request):
    data = request.data['username']
    try:
        indi = Individual_Owner.objects.get(user=User.objects.get(username=data))
        serializer = Individual_OwnerSerializer(indi)  
        return Response({'status':200,'data':serializer.data})
    except (Individual_Owner.DoesNotExist, User.DoesNotExist):  
        return Response({'status': 400, 'message': 'Error: Does Not Exist'})

@api_view(['POST'])
def addAmbulance(request):
    try:
        try:
            u = request.data['username']
            user = Fleet_Owner.objects.get(user=User.objects.get(username=u))
            if 'vehicle_number' in request.data and 'documents' in request.FILES and 'cost' in request.data and 'type' in request.data:
            # if True:
                docs = request.data['documents']
                type = request.data['type']
                city = str(request.data['city']).lower().strip().split()[0]
                vn = request.data['vehicle_number']
                ambulance = Ambulance.objects.create(
                                        owner=user,
                                        vehicle_number = vn,
                                        type = type,
                                        cost = request.data['cost'],
                                        documents = docs,
                                        city=city,
                                                 )
                user.ambulanceCount+=1
                user.save()
                ambulance.save()
                return Response({'status':200,'message':'Ambulance created Successfully'})
            else:
                return Response({'status':400,'message':'Missing Information'})
        except Fleet_Owner.DoesNotExist or User.DoesNotExist:
            return Response({'status':400,'message':'Does Not Exist - exception'}) 
    except Exception as e:
        return Response({'status': 400, 'message': 'Error: ' + str(e)})

@api_view(['POST'])
def getAllAmbulance(request):
    try: 
        fleet = Fleet_Owner.objects.get(user__username=request.data['username'])
        ambulances = Ambulance.objects.filter(owner=fleet)
        serializer = AmbulanceSerializer(ambulances, many=True)
        return Response({'status': 200, 'data': serializer.data})
    except (Fleet_Owner.DoesNotExist, User.DoesNotExist):
        return Response({'status': 400, 'message': 'Fleet Owner or User does not exist'})
    except Exception as e:
        return Response({'status': 400, 'message': 'Error: ' + str(e)})

@api_view(['POST'])
def getAllDrivers(request):
    try: 
        fleet = Fleet_Owner.objects.get(user__username=request.data['username'])
        drivers = Driver.objects.filter(underFleet=fleet)
        serializer = DriverSerializer(drivers, many=True)
        return Response({'status': 200, 'data': serializer.data})
    except (Fleet_Owner.DoesNotExist, User.DoesNotExist):
        return Response({'status': 400, 'message': 'Fleet Owner or User does not exist'})
    except Exception as e:
        return Response({'status': 400, 'message': 'Error: ' + str(e)})

@api_view(['GET'])
def ambulances(request):
    try:
        li = []
        ambulances = Ambulance.objects.all()
        for ambulance in ambulances:
            l = [ambulance.longi,ambulance.lati,ambulance.type,ambulance.cost,ambulance.vehicle_number]
            li.append(l)

        individual = Individual_Owner.objects.all()
        for indi in individual:
            l = [indi.longi,indi.lati,indi.type,indi.cost,indi.vehicle_number]
            li.append(l)
        return Response({'status':200,'data':li})
    except Exception as e:
        return Response({'status': 400, 'message': 'Error: ' + str(e)})

@api_view(['GET'])
def hospital(request):
    try:
        hospital = Hospital.objects.all()
        serializer = HospitalSerializer(hospital, many=True)
        return Response({ 'status': 200, 'data': serializer.data})
    except Exception as e:
        return Response({'status': 400, 'message': 'Error: ' + str(e)})
    
    
