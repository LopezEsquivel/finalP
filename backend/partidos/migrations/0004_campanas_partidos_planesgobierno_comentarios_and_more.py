# Generated by Django 5.2.1 on 2025-06-05 19:27

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('partidos', '0003_perfilusuario_delete_publicacion'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Campanas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_campaña', models.CharField(max_length=100)),
                ('descripcion', models.TextField(blank=True)),
                ('fecha_inicio', models.DateField()),
                ('fecha_fin', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Partidos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_partido', models.CharField(max_length=50)),
                ('fecha_creacion', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='PlanesGobierno',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('propuestas', models.TextField()),
                ('criticas', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Comentarios',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('texto_comentario', models.TextField()),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Politicos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('campana', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='partidos.campanas')),
                ('partido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='partidos.partidos')),
            ],
        ),
        migrations.CreateModel(
            name='Opiniones',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contenido', models.TextField()),
                ('fecha_critica', models.DateTimeField(auto_now_add=True)),
                ('partido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='partidos.partidos')),
                ('politico', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='partidos.politicos')),
            ],
        ),
        migrations.CreateModel(
            name='Debates',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('partido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='partidos.partidos')),
                ('politico', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='partidos.politicos')),
            ],
        ),
        migrations.CreateModel(
            name='Postulantes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('apellido', models.CharField(max_length=100)),
                ('partido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='partidos.partidos')),
            ],
        ),
    ]
