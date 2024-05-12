from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import *

urlpatterns = [
    path('login/',LoginAPI.as_view(),name='Login'),
    path('registerdriver/',registerDriver),
    path('registerfleetowner/',registerFleetOwner),
    path('registerindividual/',registerIndividual),
    path('userdetails/',userDetails),
    path('addfleetfordriver/',addFleetForDriver),
    path('addambulance/',addAmbulance),

    path('getdriverdetails/',getDriverDetails),
    path('getfleetdetails/',getFleetDetails),
    path('getindividualdetails/',getIndividualDetails),

    path('getallambulances/',getAllAmbulance),
    path('getalldrivers/',getAllDrivers),

    path('ambulances/',ambulances),
]

urlpatterns+=static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)