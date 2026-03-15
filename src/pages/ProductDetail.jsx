import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity
    });
    setTimeout(() => setIsAdding(false), 800);
  };

  if (error) return <div className="detail-error">{error}</div>;
  if (loading) return <div className="detail-loading"><div className="loading-spinner"></div></div>;
  if (!product) return <div className="detail-error">Product not found</div>;

  return (
    <div className="product-detail-page fade-in">
      <div className="page-container">
        <button onClick={() => navigate(-1)} className="back-btn glass">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="detail-grid">
          <div className="detail-image-wrapper glass-card">
            <img src={product.image} alt={product.title} />
          </div>
          
          <div className="detail-content glass-card">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-title">{product.title}</h1>
            
            <div className="detail-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < Math.round(product.rating.rate) ? 'star-filled' : 'star-empty'} 
                    fill={i < Math.round(product.rating.rate) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="rating-text">{product.rating.rate} Score ({product.rating.count} reviews)</span>
            </div>

            <div className="detail-price">${product.price.toFixed(2)}</div>
            
            <div className="detail-description">
              <h3>About this item</h3>
              <p>{product.description}</p>
            </div>

            <div className="detail-actions">
              <div className="qty-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              
              <button 
                className={`btn btn-primary add-to-cart-large ${isAdding ? 'adding' : ''}`}
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                <ShoppingCart size={22} />
                {isAdding ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
