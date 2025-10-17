import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/movies', { replace: true });
  };

  return (
    <nav className="navbar-swars">
      <div className="navbar-logo">🌟 Star Wars GraphQL API</div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li><Link to="/movies">Inicio</Link></li>
          <li><Link to="/movies">Películas</Link></li>
          {user && (
            <li><Link to="/manage-movies">Gestionar Película</Link></li>
          )}
        </ul>
        {user ? (
          <button className="logout-btn-navbar" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        ) : (
          <Link to="/login">
            <button className="login-btn-navbar">
              <span style={{ color: '#f7f6f4ff', borderRadius: '8px', fontWeight: 600 }}>Ingresar</span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
