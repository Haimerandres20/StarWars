const MOVIE_MUTATION = `
mutation CrearPelicula($input: CrearPeliculaRelayInput!) {
  crearPelicula(input: $input) {
    pelicula {
      id
      titulo
      textoDeApertura
      director
      productores
      fechaEstreno
      duracionMinutos
      planetas { edges { node { id nombre } } }
      personajes { edges { node { id nombre } } }
    }
  }
}`;

export default MOVIE_MUTATION;
