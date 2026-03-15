import React from 'react';
import ProductCard from '../ProductCard/index';
import './ProductList.css';

const ProductList = ({ products, loading, error }) => {
  if (error) {
    return <div className="error-container glass-card fade-in">
      <h2>Oops! Something went wrong.</h2>
      <p>{error}</p>
    </div>;
  }

  if (loading) {
    return (
      <div className="loading-grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton-card glass-card">
            <div className="skeleton-img"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text small"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <div className="empty-state">No products found matching your criteria.</div>;
  }

  return (
    <div className="products-grid">
      {products.map((product, index) => (
        <div key={product.id} style={{ animationDelay: `${index * 50}ms` }} className="fade-in-up">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
