import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', zip: '',
    cardName: '', cardNumber: '', exp: '', cvv: ''
  });

  const [errors, setErrors] = useState({});

  if (cartItems.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.address) newErrors.address = 'Address required';
    if (!formData.cardNumber || formData.cardNumber.length < 16) newErrors.cardNumber = 'Valid 16-digit card number required';
    if (!formData.cvv || formData.cvv.length < 3) newErrors.cvv = 'Valid CVV required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        clearCart();
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="checkout-success fade-in glass-card">
        <CheckCircle size={80} className="success-icon" />
        <h2>Order Confirmed!</h2>
        <p>Thank you for shopping with us, {formData.firstName}.</p>
        <p className="order-number">Order #AURA-{Math.floor(Math.random() * 1000000)}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary mt-4">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-grid fade-in">
      <div className="checkout-form-section glass-card">
        <div className="secure-badge">
          <ShieldCheck size={20} className="secure-icon" />
          <span>Secure Checkout</span>
        </div>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Contact Information</h3>
          <div className="form-row">
            <div className="input-field">
              <label>First Name</label>
              <input 
                type="text" 
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
            </div>
            <div className="input-field">
              <label>Last Name</label>
              <input 
                type="text" 
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
            </div>
          </div>
          <div className="input-field">
            <label>Email Address</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <h3>Shipping Address</h3>
          <div className="input-field">
            <label>Address</label>
            <input 
              type="text" 
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              className={errors.address ? 'error' : ''}
            />
            {errors.address && <span className="error-msg">{errors.address}</span>}
          </div>
          <div className="form-row">
            <div className="input-field">
              <label>City</label>
              <input 
                type="text" 
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div className="input-field">
              <label>ZIP / Postal Code</label>
              <input 
                type="text" 
                value={formData.zip}
                onChange={e => setFormData({...formData, zip: e.target.value})}
              />
            </div>
          </div>

          <h3>Payment Details Simulated</h3>
          <div className="input-field">
            <label>Name on Card</label>
            <input 
              type="text" 
              value={formData.cardName}
              onChange={e => setFormData({...formData, cardName: e.target.value})}
            />
          </div>
          <div className="input-field">
            <label>Card Number</label>
            <input 
              type="text" 
              maxLength="16"
              placeholder="0000 0000 0000 0000"
              value={formData.cardNumber}
              onChange={e => setFormData({...formData, cardNumber: e.target.value})}
              className={errors.cardNumber ? 'error' : ''}
            />
            {errors.cardNumber && <span className="error-msg">{errors.cardNumber}</span>}
          </div>
          <div className="form-row">
            <div className="input-field">
              <label>Expiration (MM/YY)</label>
              <input 
                type="text" 
                placeholder="MM/YY"
                value={formData.exp}
                onChange={e => setFormData({...formData, exp: e.target.value})}
              />
            </div>
            <div className="input-field">
              <label>CVV</label>
              <input 
                type="text" 
                maxLength="4"
                value={formData.cvv}
                onChange={e => setFormData({...formData, cvv: e.target.value})}
                className={errors.cvv ? 'error' : ''}
              />
              {errors.cvv && <span className="error-msg">{errors.cvv}</span>}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className="loading-spinner small"></span> : `Pay $${(cartTotal * 1.08).toFixed(2)}`}
          </button>
        </form>
      </div>

      <div className="checkout-summary glass-card">
        <h3>Order Items</h3>
        <div className="mini-cart-list">
          {cartItems.map(item => (
            <div key={item.id} className="mini-cart-item">
              <img src={item.image} alt={item.title} />
              <div className="mini-item-info">
                <span className="mini-title">{item.title}</span>
                <span className="mini-qty">Qty: {item.quantity}</span>
              </div>
              <span className="mini-price">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="summary-section">
          <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Tax (8%)</span><span>${(cartTotal * 0.08).toFixed(2)}</span></div>
          <div className="summary-total"><span>Total</span><span className="text-gradient">${(cartTotal * 1.08).toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
