from django.apps import AppConfig

class PartidosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'partidos'

    def ready(self):
        import partidos.signals  # Esto activa las señales al iniciar el servidor

