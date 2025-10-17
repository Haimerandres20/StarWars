import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene.relay import Node
from .models import Planeta, Personaje, Pelicula
import graphql_jwt
from graphql_jwt.decorators import login_required

# -----------------------------
# Types con Relay Node
# -----------------------------
class PlanetaNode(DjangoObjectType):
    class Meta:
        model = Planeta
        interfaces = (Node,)
        filter_fields = ['nombre', 'clima']


class PersonajeNode(DjangoObjectType):
    class Meta:
        model = Personaje
        interfaces = (Node,)
        filter_fields = ['nombre', 'genero', 'fecha_nacimiento']


class PeliculaNode(DjangoObjectType):
    id_db = graphene.Int()

    class Meta:
        model = Pelicula
        interfaces = (Node,)
        filter_fields = ['titulo', 'director']

    def resolve_id_db(self, info):
        return self.id


# -----------------------------
# Queries Relay
# -----------------------------
class Query(graphene.ObjectType):
    # Node individual
    planeta = Node.Field(PlanetaNode)
    personaje = Node.Field(PersonajeNode)
    pelicula = Node.Field(PeliculaNode)

    # Listas paginables y filtrables
    all_planetas = DjangoFilterConnectionField(PlanetaNode)
    all_personajes = DjangoFilterConnectionField(PersonajeNode)
    all_peliculas = DjangoFilterConnectionField(PeliculaNode)

    # Resolvers protegidos con JWT

    def resolve_all_personajes(self, info, nombre=None, **kwargs):
        qs = Personaje.objects.all()
        if nombre:
            qs = qs.filter(nombre__icontains=nombre)
        return qs


    def resolve_all_peliculas(self, info, titulo=None, **kwargs):
        qs = Pelicula.objects.all().order_by('-id')
        if titulo:
            qs = qs.filter(titulo__icontains=titulo)
        return qs


# -----------------------------
# Mutations Relay con JWT
# -----------------------------
class CrearPlanetaRelay(graphene.relay.ClientIDMutation):
    class Input:
        nombre = graphene.String(required=True)
        clima = graphene.String()
        poblacion = graphene.Int()
        descripcion = graphene.String()

    planeta = graphene.Field(PlanetaNode)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        planeta = Planeta.objects.create(
            nombre=input.get('nombre'),
            clima=input.get('clima', ''),
            poblacion=input.get('poblacion'),
            descripcion=input.get('descripcion', '')
        )
        return CrearPlanetaRelay(planeta=planeta)


class CrearPersonajeRelay(graphene.relay.ClientIDMutation):
    class Input:
        nombre = graphene.String(required=True)
        fecha_nacimiento = graphene.String()
        genero = graphene.String()
        mundo_origen_id = graphene.ID()
        biografia = graphene.String()

    personaje = graphene.Field(PersonajeNode)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        mundo = None
        if input.get('mundo_origen_id'):
            mundo = Node.get_node_from_global_id(info, input.get('mundo_origen_id'), PlanetaNode)
        personaje = Personaje.objects.create(
            nombre=input.get('nombre'),
            fecha_nacimiento=input.get('fecha_nacimiento', ''),
            genero=input.get('genero', ''),
            mundo_origen=mundo,
            biografia=input.get('biografia', '')
        )
        return CrearPersonajeRelay(personaje=personaje)


class CrearPeliculaRelay(graphene.relay.ClientIDMutation):
    class Input:
        titulo = graphene.String(required=True)
        texto_de_apertura = graphene.String()
        director = graphene.String()
        productores = graphene.String()
        fecha_estreno = graphene.types.datetime.Date()
        duracion_minutos = graphene.Int()
        planetas_ids = graphene.List(graphene.ID)
        personajes_ids = graphene.List(graphene.ID)

    pelicula = graphene.Field(PeliculaNode)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        pelicula = Pelicula.objects.create(
            titulo=input.get('titulo'),
            texto_de_apertura=input.get('texto_de_apertura', ''),
            director=input.get('director', ''),
            productores=input.get('productores', ''),
            fecha_estreno=input.get('fecha_estreno'),
            duracion_minutos=input.get('duracion_minutos')
        )

        # Asociar planetas usando global IDs
        if input.get('planetas_ids'):
            planetas = [
                Node.get_node_from_global_id(info, pid, PlanetaNode)
                for pid in input['planetas_ids']
            ]
            pelicula.planetas.set(filter(None, planetas))

        # Asociar personajes usando global IDs
        if input.get('personajes_ids'):
            personajes = [
                Node.get_node_from_global_id(info, pid, PersonajeNode)
                for pid in input['personajes_ids']
            ]
            pelicula.personajes.set(filter(None, personajes))

        return CrearPeliculaRelay(pelicula=pelicula)


# -----------------------------
# Root Mutation
# -----------------------------
class Mutation(graphene.ObjectType):
    crear_planeta = CrearPlanetaRelay.Field()
    crear_personaje = CrearPersonajeRelay.Field()
    crear_pelicula = CrearPeliculaRelay.Field()

    # JWT Mutations
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


# -----------------------------
# Schema
# -----------------------------
schema = graphene.Schema(query=Query, mutation=Mutation)
