import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/ProductList/index';
import './Home.css';
import { Filter, ChevronDown } from 'lucide-react';

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
      <div className="hero-section glass-card">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover <span className="text-gradient">Premium</span> Products
          </h1>
          <p className="hero-subtitle">Elevate your lifestyle with our curated collection of aesthetic and high-quality items.</p>
        </div>
      </div>

      <div className="page-container">
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
    </div>
  );
};

export default Home;
