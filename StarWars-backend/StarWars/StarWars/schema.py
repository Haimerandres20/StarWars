import graphene
import api.schema         # Queries y mutaciones de la app
import api.auth_schema    # JWT

# Combina queries de la app
class Query(api.schema.Query, graphene.ObjectType):
    pass

# Combina mutaciones de la app y JWT
class Mutation(api.schema.Mutation, api.auth_schema.AuthMutation, graphene.ObjectType):
    pass

# Schema final
schema = graphene.Schema(query=Query, mutation=Mutation)

