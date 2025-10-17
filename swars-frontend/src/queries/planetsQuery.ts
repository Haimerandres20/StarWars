const PLANETS_QUERY = `
  query {
    allPlanetas {
      edges {
        node {
          id
          nombre
        }
      }
    }
  }
`;

export default PLANETS_QUERY;
