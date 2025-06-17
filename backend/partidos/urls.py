from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostulantesViewSet

from .views import (
    CrearUsuarioView,
    Loginview,
    CampanasCreateView,
    PartidosViewSet,
    PoliticosView,
    PlanesGobiernoView,
    DebatesView,
    ComentariosView,
    OpinionesView
)

router = DefaultRouter()
router.register(r'partidos', PartidosViewSet, basename='partidos')
router.register(r'postulantes', PostulantesViewSet, basename='postulantes')  # ✅ esta línea aquí

urlpatterns = [
    path("crear_usuario/", CrearUsuarioView.as_view()),
    path("login_usuario/", Loginview.as_view()),
    path("campanas/", CampanasCreateView.as_view()),
    path("Politicos/", PoliticosView.as_view()),
    path("planesGobierno/", PlanesGobiernoView.as_view()),
    path("debates/", DebatesView.as_view()),
    path("comentarios/", ComentariosView.as_view()),
    path("opiniones/", OpinionesView.as_view()),
    path("", include(router.urls)),  # ✅ debe ir al final
]
