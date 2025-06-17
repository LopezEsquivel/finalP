from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import PerfilUsuario
from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth import authenticate
from .models import Campanas
from .serializers import CampanasSerializer
from rest_framework.generics import ListCreateAPIView
from .serializers import PartidosSerializer
from .models import Partidos
from .models import Politicos
from .serializers import PoliticosSerializer,UserSerializer
from .serializers import PlanesGobiernoSerializer
from .models import PlanesGobierno
from .serializers import DebatesSerializer
from .models import Debates
from .serializers import ComentariosSerializer
from .models import Comentarios
from .serializers import PostulantesSerializer
from .models import Postulantes
from .models import Opiniones
from .serializers import OpinionesSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.viewsets import ModelViewSet

class CrearUsuarioView(ListCreateAPIView):
     queryset= User.objects.all()
     serializer_class= UserSerializer

    
class Loginview(APIView):
        def post(self,request):
            nombre_usuario=request.data.get("username")
            password= request.data.get("password")
            
            usuario= authenticate(username=nombre_usuario, password=password)
            
            if usuario is not None:
                return Response ({"mensaje":"Autenticasion exitosa"})
            else: 
                return Response ({"Error"})

class CampanasCreateView(ListCreateAPIView):
     queryset = Campanas.objects.all()
     serializer_class = CampanasSerializer

class PartidosViewSet(viewsets.ModelViewSet): 
     queryset= Partidos.objects.all()
     serializer_class= PartidosSerializer

class PoliticosView(ListCreateAPIView):
     queryset= Politicos.objects.all()
     serializer_class= PoliticosSerializer

class PlanesGobiernoView(ListCreateAPIView):
     queryset= PlanesGobierno.objects.all()
     serializer_class= PlanesGobiernoSerializer

class DebatesView(ListCreateAPIView):
     queryset= Debates.objects.all()
     serializer_class= DebatesSerializer

class ComentariosView(ListCreateAPIView):
     queryset= Comentarios.objects.all()
     serializer_class= ComentariosSerializer

class OpinionesView(ListCreateAPIView):
     queryset=Opiniones.objects.all()
     serializer_class= OpinionesSerializer

class PostulantesViewSet(ModelViewSet):
    queryset = Postulantes.objects.all()
    serializer_class = PostulantesSerializer
