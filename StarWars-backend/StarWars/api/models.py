from django.db import models


class Planeta(models.Model):
    nombre = models.CharField(max_length=200, unique=True)
    clima = models.CharField(max_length=200, blank=True)
    poblacion = models.BigIntegerField(null=True, blank=True)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre


class Personaje(models.Model):
    nombre = models.CharField(max_length=200)
    fecha_nacimiento = models.CharField(max_length=20, blank=True)
    genero = models.CharField(max_length=50, blank=True)
    mundo_origen = models.ForeignKey(
        Planeta,
        related_name='residentes',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="Planeta natal del personaje"
    )
    biografia = models.TextField(blank=True)
    creado = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return self.nombre


class Pelicula(models.Model):
    titulo = models.CharField(max_length=300)
    texto_de_apertura = models.TextField(blank=True, help_text='Opening crawl')
    director = models.CharField(max_length=200, blank=True)
    productores = models.TextField(blank=True, help_text='Lista de productores como texto o JSON simple')
    fecha_estreno = models.DateField(null=True, blank=True)
    duracion_minutos = models.IntegerField(null=True, blank=True)

    # Relaciones principales
    planetas = models.ManyToManyField(Planeta, related_name='peliculas', blank=True)
    personajes = models.ManyToManyField(Personaje, related_name='peliculas', blank=True)

    class Meta:
        ordering = ['-fecha_estreno', 'titulo']

    def __str__(self):
        return self.titulo
