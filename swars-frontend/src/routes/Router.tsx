
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../context/AuthContext';

import Login from '../pages/Login/Login'; 

import Home from '../pages/Home/Home';
import Movies from '../pages/Movies/Movies';
import MoviesTable from '../pages/Movies/MoviesTable';
import AddMovie from '../pages/AddMovie/AddMovie';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Layout from '../components/Layout/Layout';

import './router.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/home" element={<ProtectedRoute element={<Layout><Home /></Layout>} />} />
              <Route path="/movies" element={<Layout><Movies /></Layout>} />
              <Route path="/manage-movies" element={<ProtectedRoute element={<Layout><MoviesTable /></Layout>} />} />
              <Route path="/add-movie" element={<ProtectedRoute element={<Layout><AddMovie /></Layout>} />} />
              <Route path="/" element={<Layout><Movies /></Layout>} />
            </Routes>
          </div>
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            style={{
              fontSize: '14px',
              zIndex: 9999
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
