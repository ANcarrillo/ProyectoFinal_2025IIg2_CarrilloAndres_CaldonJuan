import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Context'; // Ajusta la ruta según tu proyecto
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout, user, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">Noticias Hoy</div>
      <nav className="nav">
        <ul>
          {!isAuthenticated ? (
            // Menú para usuarios no autenticados
            <>
              <li><a href="/">Inicio</a></li>
              <li><a href="/categoria/politica">Política</a></li>
              <li><a href="/categoria/cultura">Cultura</a></li>
              <li><a href="/categoria/deportes">Deportes</a></li>
              <li><a href="/categoria/salud">Salud</a></li>
              <li><a href="/categoria/negocio">Negocio</a></li>
              <li><a href="/categoria/tecnologia">Tecnología</a></li>
              <li><a href="Login">Login</a></li>
            </>
          ) : (
            // Menú para usuarios autenticados
            <>
              <li><a href="/reportero">Panel</a></li>
              <li className="user-info">{user?.email}</li>
              
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;