import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/ProductList/index';
import './Home.css';
import { Filter, ChevronDown, Truck, ShieldCheck, Clock, CreditCard } from 'lucide-react';

const Home = () => {
  const {
    products,
    categories,
    loading,
    error,
    activeCategory,
    setActiveCategory,
    sortOrder,
    setSortOrder
  } = useProducts();

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <div className="hero-section glass-card">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover <span className="text-gradient">Premium</span> Products
          </h1>
          <p className="hero-subtitle">
            Elevate your lifestyle with our curated collection of aesthetic and high-quality items. 
            Experience seamless shopping today.
          </p>
          <button className="hero-cta-btn" onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}>
            Shop Collection Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="feature-card glass">
          <Truck className="feature-icon" size={32} />
          <h3>Free Shipping</h3>
          <p>On all orders over $50</p>
        </div>
        <div className="feature-card glass">
          <ShieldCheck className="feature-icon" size={32} />
          <h3>Secure Payment</h3>
          <p>100% secure checkout</p>
        </div>
        <div className="feature-card glass">
          <Clock className="feature-icon" size={32} />
          <h3>24/7 Support</h3>
          <p>Always here to help you</p>
        </div>
        <div className="feature-card glass">
          <CreditCard className="feature-icon" size={32} />
          <h3>Easy Returns</h3>
          <p>30 days return policy</p>
        </div>
      </div>

      <div className="page-container" id="products-section">
        <div className="section-header text-center">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Our Collection</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Explore the finest products tailored just for you</p>
        </div>

        <div className="controls-bar glass">
          <div className="categories-list">
            <button 
              className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Items
            </button>
            {categories.map(category => (
              <button 
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="sort-control">
            <Filter size={18} className="sort-icon" />
            <div className="sort-dropdown">
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                className="sort-select"
                aria-label="Sort products"
              >
                <option value="default">Sort by Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown size={16} className="dropdown-arrow" />
            </div>
          </div>
        </div>

        <ProductList products={products} loading={loading} error={error} />
      </div>

      {/* Footer Section */}
      <footer className="footer-section glass">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>Aura Store</h2>
            <p>Premium quality aesthetic products for a better lifestyle.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Aura Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
