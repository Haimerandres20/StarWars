// Tipos para formularios de autenticación
export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  password: string;
  email: string;
}

// Tipos para el contexto de autenticación
export interface User {
  username: string;
}

export interface AuthContextType {
  user: User | null;
  login: (data: TokenResponse) => void;
  logout: () => void;
  isLoading: boolean;
}

// Tipos para tokens
export interface TokenResponse {
  access: string;
  refresh: string;
  user?: User;
}

export interface RefreshTokenResponse {
  access: string;
}

// Tipos para tareas
export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estado_actual: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// Tipos para componentes
export interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Tipos para errores de API
export interface ApiError {
  response?: {
    status: number;
    data?: {
      error?: string[];
      password?: string[];
      [key: string]: any;
    };
  };
}