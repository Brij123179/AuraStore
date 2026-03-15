import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty glass-card fade-in">
        <div className="empty-icon-wrapper">
          <div className="empty-icon"></div>
        </div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn btn-primary mt-4">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container fade-in">
      <div className="cart-items-section glass-card">
        <div className="cart-header">
          <h2>Shopping Cart ({cartItems.length})</h2>
          <button onClick={clearCart} className="btn-clear">Clear All</button>
        </div>

        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.title} />
              </div>
              
              <div className="item-details">
                <Link to={`/product/${item.id}`} className="item-title">{item.title}</Link>
                <div className="item-price">${item.price.toFixed(2)}</div>
              </div>

              <div className="item-actions">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-summary glass-card">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-row">
          <span>Tax</span>
          <span>${(cartTotal * 0.08).toFixed(2)}</span>
        </div>
        
        <div className="summary-total">
          <span>Total</span>
          <span className="text-gradient">${(cartTotal * 1.08).toFixed(2)}</span>
        </div>

        <button 
          className="btn btn-primary checkout-btn"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
        
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
