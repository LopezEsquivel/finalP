from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

class PerfilUsuario(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    biografia = models.TextField(blank=True)
    foto_perfil = models.CharField(max_length=100)
    def __str__(self):
        return self.usuario.username
    

class Partidos(models.Model):
    nombre_partido = models.CharField(max_length=50)
    fecha_creacion = models.DateField()

class Campanas(models.Model):
    nombre_campaña = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(null=True, blank=True)
    partido = models.ForeignKey(Partidos,on_delete=models.CASCADE)

class Politicos(models.Model):
    nombre = models.CharField(max_length=100)
    campana = models.ForeignKey(Campanas,on_delete=models.CASCADE)
    partido = models.ForeignKey(Partidos, on_delete=models.CASCADE)

class PlanesGobierno(models.Model):
    propuestas = models.TextField()
    criticas = models.TextField()

class Debates(models.Model):
    politico = models.ForeignKey(Politicos, on_delete=models.CASCADE)
    partido = models.ForeignKey(Partidos, on_delete=models.CASCADE)


class Comentarios(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    texto_comentario = models.TextField()

class Postulantes(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    partido = models.ForeignKey(Partidos, on_delete=models.CASCADE)
    biografia = models.TextField(blank=True)
    propuestas = models.TextField(blank=True)
    criticas = models.TextField(blank=True)  
    logros = models.TextField(blank=True)    
    historia = models.TextField(blank=True)  
    imagen = models.URLField(blank=True)


    def __str__(self):
        return f"{self.nombre} {self.apellido}"


class Opiniones(models.Model):
    partido = models.ForeignKey(Partidos, on_delete=models.CASCADE)
    politico = models.ForeignKey(Politicos, on_delete=models.CASCADE)
    contenido = models.TextField()
    fecha_critica = models.DateTimeField(auto_now_add=True)
                #guarda fecha y hora     #pone automáticamente la fecha y hora

class Presidente(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    img = CloudinaryField('image', folder='Presidentes')

    def __str__(self):
        return self.nombre
    
class Presidente(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    img = CloudinaryField('image', folder='Presidentes')
    que_hizo_en_su_partido = models.TextField(blank=True, null=True)
    bibliografia = models.TextField(blank=True, null=True)
    criticas = models.TextField(blank=True, null=True)
    logros = models.TextField(blank=True, null=True)
    despues_de_la_presidencia = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre




