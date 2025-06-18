from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Campanas
from .models import Partidos
from.models import Politicos
from.models import PlanesGobierno
from.models import Debates
from.models import Comentarios
from.models import Postulantes
from.models import Opiniones
from .models import Presidente
from django.contrib.auth.models import User


class CampanasSerializer(ModelSerializer):
    class Meta:
        model = Campanas
        fields = "__all__" # ["id","nom...."]

class PartidosSerializer(ModelSerializer):
    class Meta: 
        model = Partidos
        fields = "__all__"

class PoliticosSerializer(serializers.ModelSerializer):
    nombre_partido = serializers.CharField(source='partido.nombre_partido', read_only=True)
    nombre_campana = serializers.CharField(source='campana.nombre_campaña', read_only=True)

    class Meta:
        model = Politicos
        fields = ['id', 'nombre', 'partido', 'campana', 'nombre_partido', 'nombre_campana']

    
class PlanesGobiernoSerializer(ModelSerializer):
    class Meta:
        model = PlanesGobierno
        fields = "__all__"


class DebatesSerializer(ModelSerializer):
    class Meta:
        model = Debates
        fields= "__all__"


class ComentariosSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.SerializerMethodField()
    texto = serializers.CharField(source='texto_comentario')

    class Meta:
        model = Comentarios
        fields = ['id', 'usuario', 'texto', 'usuario_nombre']

    def get_usuario_nombre(self, obj):
        return obj.usuario.username if obj.usuario else ''


class PostulantesSerializer(serializers.ModelSerializer):
    nombre_partido = serializers.CharField(source='partido.nombre_partido', read_only=True)

    class Meta:
        model = Postulantes
        fields = [
            'id', 'nombre', 'apellido', 'partido', 'nombre_partido',
            'biografia', 'propuestas', 'criticas', 'logros', 'historia', 'imagen'
        ]
        extra_kwargs = {
            'imagen': {'required': False, 'allow_blank': True}
        }


class OpinionesSerializer(ModelSerializer):
    class Meta:
        model= Opiniones
        fields ="__all__"

class UserSerializer(ModelSerializer):
   
    class Meta:
        model= User
        fields =['id','username','first_name','last_name','email','password']
        extra_kwargs = {
            'password': {'write_only': True}  # Oculta la contraseña en respuestas
        }
        
    def create(self, validated_data): 
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user 

class PresidenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Presidente
        fields = [
            'id', 'nombre', 'descripcion', 'img',
            'que_hizo_en_su_partido', 'bibliografia',
            'criticas', 'logros', 'despues_de_la_presidencia'
        ]


   
