# Análisis de Mutaciones - Proyecto StarWars GraphQL

##  Resumen de Mutaciones CRUD

###  **PLANETA - Mutaciones**

#### `CrearPlanetaRelay`
```graphql
mutation {
  crearPlaneta(input: {
    nombre: "Tatooine"
    clima: "Árido"
    poblacion: 200000
    descripcion: "Planeta desértico con dos soles"
  }) {
    planeta {
      id
      nombre
      clima
      poblacion
      descripcion
    }
  }
}



{
  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzYwNjUyODMzLCJvcmlnSWF0IjoxNzYwNjQ5MjMzfQ.BDOuvudSTCWVx3gTSTpieLcRgtHCUp4uXUET-uVgHJ8"
}
```



###  **PERSONAJE - Mutaciones**

#### `CrearPersonajeRelay`
```graphql
mutation {
  crearPersonaje(input: {
    nombre: "Luke Skywalker"
    fechaNacimiento: "1977-05-25"
    genero: "Masculino"
    mundoOrigenId: "UGxhbmV0YU5vZGU6MQ=="
    biografia: "Jedi que destruyó la Estrella de la Muerte"
  }) {
    personaje {
      id
      nombre
      fechaNacimiento
      genero
      mundoOrigen {
        nombre
      }
      biografia
    }
  }
}
```



###  **PELÍCULA - Mutaciones**

#### `CrearPeliculaRelay`
```graphql
mutation {
  crearPelicula(input: {
    titulo: "Una Nueva Esperanza"
    textoDeApertura: "La guerra civil galáctica..."
    director: "George Lucas"
    productores: "Gary Kurtz, Rick McCallum"
    fechaEstreno: "1977-05-25"
    duracionMinutos: 121
    planetasIds: ["UGxhbmV0YU5vZGU6MQ==", "UGxhbmV0YU5vZGU6Mg=="]
    personajesIds: ["UGVyc29uYWplTm9kZTox", "UGVyc29uYWplTm9kZToy"]
  }) {
    pelicula {
      id
      titulo
      textoDeApertura
      director
      productores
      fechaEstreno
      duracionMinutos
      planetas {
        edges {
          node {
            nombre
          }
        }
      }
      personajes {
        edges {
          node {
            nombre
          }
        }
      }
    }
  }
}
```



##  **AUTENTICACIÓN - Mutaciones JWT**
### `tokenAuth` - Login
```graphql
mutation {
  tokenAuth(username: "admin", password: "Admin") {
    token
  }
}
```

* Respuesta exitosa:**
```json
{
  "data": {
    "tokenAuth": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzYwNjUyODMzLCJvcmlnSWF0IjoxNzYwNjQ5MjMzfQ.BDOuvudSTCWVx3gTSTpieLcRgtHCUp4uXUET-uVgHJ8"
    }
  }
}
```





## todas las peliculas


query {
  allPeliculas {
    edges {
      node {
        id
        titulo
        textoDeApertura
        director
        productores
        fechaEstreno
        duracionMinutos
        planetas {
          edges {
            node {
              nombre
            }
          }
        }
        personajes {
          edges {
            node {
              nombre
            }
          }
        }
      }
    }
  }
}