import React, { useState} from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginGraphQL } from '../../services/graphqlService';
import { showSuccessNotification, showErrorNotification } from '../../utils/notifications';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import './Login2.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login, user, isLoading } = useAuth();
  const navigate = useNavigate();


  if (isLoading) {
    return <div>Cargando...</div>;
  }


  if (user) {
    return <Navigate to="/home" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginGraphQL(username, password);

      login({
        access: result.token,
        refresh: result.refreshToken
      });
      showSuccessNotification('Ingreso exitoso con GraphQL');
      navigate('/home', { replace: true });
    } catch (error: any) {
      const errorMessage = error.message || 'Ha ocurrido un error';
      setErrorMessage(errorMessage);
      showErrorNotification(errorMessage);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000); 
    }
  };

  return (
    <div className="container-login">
      <div className="content">
        <div className="left-column">
          <div className="logo">
            <div className="star-wars-logo">🌟</div>
          </div>
          <h1>🚀 Acceso Galáctico</h1>
          <p className="subtitle">Star Wars GraphQL API</p>
        </div>
        <div className="right-column">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="username">👤 Usuario:</label>
            </div>

            <div className="form-group">
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="🔐 Contraseña:"
                required
              />

            <div className={`error-message ${errorMessage ? 'show' : ''}`}>
            {errorMessage}
            </div>

            </div>
            <div className="form-info">
              <span>🌌 Ingresa con tu cuenta de la Galaxia Star Wars</span>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-next">🚀 Acceder a la Galaxia</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
