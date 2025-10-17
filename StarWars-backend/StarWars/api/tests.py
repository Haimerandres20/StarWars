
from .models import Planeta, Personaje, Pelicula
from datetime import date
from django.test import TestCase, Client
import json


# pruebas unitarias
class ModelTests(TestCase):

    def test_crear_planeta(self):
        planeta = Planeta.objects.create(
            nombre="Tatooine",
            clima="Desértico",
            poblacion=200000,
            descripcion="Planeta desértico"
        )
        self.assertEqual(str(planeta), "Tatooine")
        self.assertEqual(planeta.clima, "Desértico")

    def test_crear_personaje(self):
        planeta = Planeta.objects.create(nombre="Alderaan")
        personaje = Personaje.objects.create(
            nombre="Leia Organa",
            mundo_origen=planeta
        )
        self.assertEqual(personaje.mundo_origen.nombre, "Alderaan")
        self.assertEqual(str(personaje), "Leia Organa")

    def test_crear_pelicula(self):
        p1 = Planeta.objects.create(nombre="Tatooine")
        personaje = Personaje.objects.create(nombre="Luke Skywalker", mundo_origen=p1)
        pelicula = Pelicula.objects.create(
            titulo="Una Nueva Esperanza",
            director="George Lucas",
            fecha_estreno=date(1977, 5, 25)
        )
        pelicula.planetas.add(p1)
        pelicula.personajes.add(personaje)
        self.assertIn(p1, pelicula.planetas.all())
        self.assertIn(personaje, pelicula.personajes.all())


# pruebas de integracion


class GraphQLPersonajeIntegrationTest(TestCase):
    def setUp(self):
        self.client = Client()

        # Crear planeta
        self.tatooine = Planeta.objects.create(nombre="Tatooine", clima="Desértico")
        self.alderaan = Planeta.objects.create(nombre="Alderaan", clima="Templado")

        # Crear personajes
        self.luke = Personaje.objects.create(nombre="Luke Skywalker", mundo_origen=self.tatooine)
        self.leia = Personaje.objects.create(nombre="Leia Organa", mundo_origen=self.alderaan)

    def test_all_personajes_query(self):
        query = '''
        query {
          allPersonajes {
            edges {
              node {
                nombre
                mundoOrigen {
                  nombre
                }
              }
            }
          }
        }
        '''
        response = self.client.post(
            '/graphql/',
            data=json.dumps({'query': query}),
            content_type='application/json'
        )

        data = json.loads(response.content)

        # Verificar que llegaron los 2 personajes
        edges = data['data']['allPersonajes']['edges']
        self.assertEqual(len(edges), 2)

        nombres = [edge['node']['nombre'] for edge in edges]
        self.assertIn("Luke Skywalker", nombres)
        self.assertIn("Leia Organa", nombres)

        mundos = [edge['node']['mundoOrigen']['nombre'] for edge in edges]
        self.assertIn("Tatooine", mundos)
        self.assertIn("Alderaan", mundos)