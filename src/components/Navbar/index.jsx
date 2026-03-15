import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingBag, User, LogOut, Hexagon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, login, logout, loading } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setIsLoginOpen(false);
      setLoginError('');
    } catch (err) {
      setLoginError('Invalid credentials (use any email/pwd)');
    }
  };

  const navToCart = () => {
    navigate('/cart');
  };

  return (
    <>
      <nav className="navbar glass">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <Hexagon className="logo-icon" />
            <span className="text-gradient">AuraStore</span>
          </Link>

          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/" className="nav-link">Catalog</Link>
          </div>

          <div className="navbar-actions">
            {!loading && user ? (
              <div className="user-profile">
                <span className="user-greeting">Hi, {user.name}</span>
                <button onClick={logout} className="action-btn" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                className="action-btn" 
                onClick={() => setIsLoginOpen(!isLoginOpen)}
                title="Login"
              >
                <User size={20} />
              </button>
            )}
            
            <button className="cart-btn" onClick={navToCart}>
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-out Login Panel */}
      <div className={`login-panel glass-card ${isLoginOpen ? 'open' : ''}`}>
        <div className="login-header">
          <h3>Sign In</h3>
          <button className="close-btn" onClick={() => setIsLoginOpen(false)}>&times;</button>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <p className="login-hint">Simulated Auth: Enter any matching values.</p>
          {loginError && <p className="error-text">{loginError}</p>}
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary login-submit">
            Access Account
          </button>
        </form>
      </div>
    </>
  );
};

export default Navbar;
