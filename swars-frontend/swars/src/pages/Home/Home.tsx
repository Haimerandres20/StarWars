
import { useAuth } from '../../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user} = useAuth();


  return (
    <div className="home-container">

      {/* Main Content */}
      <main className="home-main">
        <div className="content-grid">
          {/* Welcome Card */}
          <div className="card welcome-card">
            <div className="card-header">
              <h2>👋 ¡Bienvenido!</h2>
            </div>
            <div className="card-body">
              <p className="welcome-message">
                Has iniciado sesión exitosamente en el sistema Star Wars GraphQL API
              </p>
            </div>
          </div>

          {/* User Info Card */}
          <div className="card user-card">
            <div className="card-header">
              <h2>👤 Información del Usuario</h2>
            </div>
            <div className="card-body">
              <div className="user-details">
                <div className="detail-item">
                  <span className="label">Usuario:</span>
                  <span className="value">{user?.username || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>


        </div>
      </main>
    </div>
  );
};

export default Home;