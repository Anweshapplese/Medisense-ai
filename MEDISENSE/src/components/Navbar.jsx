import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => navigate('/')}>
          MEDISENSE.AI
        </div>
        <ul className="nav-menu">
          <li>
            <span className="nav-link" onClick={() => navigate('/')}>
              Home
            </span>
          </li>
          <li>
            <span className="nav-link" onClick={() => navigate('/#features')}>
              Features
            </span>
          </li>
          <li>
            <span className="nav-link" onClick={() => navigate('/upload')}>
              Upload
            </span>
          </li>
          <li>
            <span className="nav-link" onClick={() => navigate('/dashboard')}>
              Dashboard
            </span>
          </li>
          <li>
            <span className="nav-link" onClick={() => navigate('/about')}>
              About
            </span>
          </li>
        </ul>
        <div className="auth-buttons">
          <button className="btn-signin" onClick={() => navigate('/signin')}>
            SIGN IN
          </button>
          <button className="btn-register" onClick={() => navigate('/signup')}>
            SIGN UP
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;