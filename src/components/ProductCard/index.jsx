import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    await addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    setTimeout(() => setIsAdding(false), 800);
  };

  const renderRating = () => {
    const rate = Math.round(product.rating.rate);
    return (
      <div className="product-rating">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={i < rate ? 'star-filled' : 'star-empty'} 
            fill={i < rate ? 'currentColor' : 'none'}
          />
        ))}
        <span className="rating-count">({product.rating.count})</span>
      </div>
    );
  };
  
  return (
    <Link to={`/product/${product.id}`} className="product-card glass-card fade-in">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
        <div className="product-category-badge">{product.category}</div>
      </div>
      
      <div className="product-content">
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>
        
        {renderRating()}
        
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            className={`add-btn ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
            aria-label="Add to Cart"
          >
            <ShoppingCart size={18} />
            <span className="add-text">{isAdding ? 'Added!' : 'Add'}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
