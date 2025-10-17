import axiosInstance from './axiosConfig';

// Tipos para GraphQL
export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

export interface LoginResponse {
  login: {
    token: string;
    refreshToken: string;
    user: {
      id: number;
      username: string;
      email: string;
      proceso: string;
      rol: string;
    };
  };
}

// Función para hacer queries GraphQL
export const graphqlQuery = async <T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<GraphQLResponse<T>> => {
  try {
    const response = await axiosInstance.post('/graphql/', {
      query,
      variables,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error en GraphQL:', error);
    throw error;
  }
};

// LOGIN - Función principal
export const loginGraphQL = async (username: string, password: string): Promise<any> => {
  const mutation = `
    mutation {
      tokenAuth(username: "${username}", password: "${password}") {
        token
      }
    }
  `;

  try {
    const response = await graphqlQuery(mutation);

    if (response.errors && response.errors.length > 0) {
      throw new Error(response.errors[0].message);
    }

    if (!response.data?.tokenAuth) {
      throw new Error('No se recibieron datos de login');
    }

    const { token } = response.data.tokenAuth;
    localStorage.setItem('access', token);

    return {
      token,
      user: { username } 
    };
  } catch (error: any) {
    console.error('Error en login GraphQL:', error);
    throw error;
  }
};

// LOGOUT - Función de cierre de sesión
export const logoutGraphQL = (): void => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};