const MOVIES_QUERY = `
  query AllPeliculas($first: Int, $after: String) {
    allPeliculas(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          idDb
          titulo
          director
          fechaEstreno
          planetas {
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
`;

export default MOVIES_QUERY;
