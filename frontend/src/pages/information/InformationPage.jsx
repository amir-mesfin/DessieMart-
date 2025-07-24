import React, { useState, useEffect, useContext} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import style from './Information.module.css'
import UseTotalPrice from '../../component/currencyFormat/UseTotalPrice'
import { DataContext } from '../../component/dataProvider/DataProvider'
import { Link } from "react-router-dom"
import { db } from '../../utility/firebase'
import { collection, addDoc, Timestamp } from "firebase/firestore";
import LayOut from '../layOut/LayOut'

export default function InformationPage({ nextStep, products }) {
  
  const [{basket, user}, dispatch] = useContext(DataContext);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    shipping: 'standard',
    billingSameAsShipping: true,
    billingAddress: '',
    promoCode: '',
    deliveryNotes: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discount, setDiscount] = useState(0); // Promo discount in $

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zip) newErrors.zip = 'ZIP code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';

    if (!formData.billingSameAsShipping && !formData.billingAddress) {
      newErrors.billingAddress = 'Billing address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePromoApply = () => {
    // simple fake promo: code 'SAVE10' gives $10 discount
    if (formData.promoCode === 'SAVE10') {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
  
      try {
        await addDoc(collection(db, "customer", user.uid, "information"), {
          ...formData,            
          created: Timestamp.now() 
        });
        console.log("Form data saved successfully!");
      } catch (err) {
        console.error("Error saving form data:", err);
      }
  
      setTimeout(() => {
        setIsSubmitting(false);
        nextStep(formData); // Continue to next step
      }, 1500);
    }
  };
  
  // total calculation
  const subtotal = UseTotalPrice();
  const shippingCost = formData.shipping === 'standard' ? 0 : 9.99;
  const total = (subtotal + shippingCost - discount).toFixed(2);

  return (

    <LayOut>
    <motion.div 
      className={style.informationPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={style.steps}>
        <Link to="/cart"><span className={style.completedStep}>Cart</span></Link>
        <span className={style.arrow}>→</span>
        <span className={style.activeStep}>Information</span>
        <span className={style.arrow}>→</span>
        <span>Payment</span>
      </div>

      <div className={style.contentWrapper}>
        <motion.form 
          className={style.form}
          onSubmit={handleSubmit}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={style.sectionTitle}>Contact Information</h2>
          <div className={style.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? style.errorInput : ''}
            />
            {errors.email && <span className={style.errorMessage}>{errors.email}</span>}
          </div>
          <div className={style.formGroup}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <h2 className={style.sectionTitle}>Shipping Address</h2>
          <div className={style.formGroup}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? style.errorInput : ''}
            />
            {errors.name && <span className={style.errorMessage}>{errors.name}</span>}
          </div>
          <div className={style.formGroup}>
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? style.errorInput : ''}
            />
            {errors.address && <span className={style.errorMessage}>{errors.address}</span>}
          </div>
          <div className={style.formRow}>
            <div className={style.formGroup}>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? style.errorInput : ''}
              />
              {errors.city && <span className={style.errorMessage}>{errors.city}</span>}
            </div>
            <div className={style.formGroup}>
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={formData.zip}
                onChange={handleChange}
                className={errors.zip ? style.errorInput : ''}
              />
              {errors.zip && <span className={style.errorMessage}>{errors.zip}</span>}
            </div>
          </div>
          <div className={style.formGroup}>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={errors.country ? style.errorInput : ''}
            >
              <option value="">Select Country</option>
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Australia</option>
            </select>
            {errors.country && <span className={style.errorMessage}>{errors.country}</span>}
          </div>

          <div className={style.formGroupCheckbox}>
            <label>
              <input
                type="checkbox"
                name="billingSameAsShipping"
                checked={formData.billingSameAsShipping}
                onChange={handleChange}
              />
              Billing address is the same as shipping
            </label>
          </div>
          {!formData.billingSameAsShipping && (
            <div className={style.formGroup}>
              <input
                type="text"
                name="billingAddress"
                placeholder="Billing Address"
                value={formData.billingAddress}
                onChange={handleChange}
                className={errors.billingAddress ? style.errorInput : ''}
              />
              {errors.billingAddress && <span className={style.errorMessage}>{errors.billingAddress}</span>}
            </div>
          )}

          <h2 className={style.sectionTitle}>Shipping Method</h2>
          <div className={style.shippingOptions}>
            <label className={style.radioLabel}>
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={formData.shipping === 'standard'}
                onChange={handleChange}
              />
              <span className={style.radioCustom}></span>
              <div>
                <span>Standard Shipping</span>
                <span className={style.shippingTime}>3-5 days • FREE</span>
              </div>
            </label>
            <label className={style.radioLabel}>
              <input
                type="radio"
                name="shipping"
                value="express"
                checked={formData.shipping === 'express'}
                onChange={handleChange}
              />
              <span className={style.radioCustom}></span>
              <div>
                <span>Express Shipping</span>
                <span className={style.shippingTime}>1-2 days • $9.99</span>
              </div>
            </label>
          </div>

          <h2 className={style.sectionTitle}>Promo Code</h2>
          <div className={style.promoGroup}>
            <input
              type="text"
              name="promoCode"
              placeholder="Enter promo code"
              value={formData.promoCode}
              onChange={handleChange}
            />
            <button type="button" onClick={handlePromoApply}>Apply</button>
          </div>
          {discount > 0 && <span className={style.successMessage}>Promo applied! -${discount}</span>}

          <div className={style.formGroup}>
            <textarea
              name="deliveryNotes"
              placeholder="Delivery instructions (optional)"
              value={formData.deliveryNotes}
              onChange={handleChange}
            />
          </div>

          <div className={style.formGroupCheckbox}>
            <label>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              I agree to the terms and conditions
            </label>
            {errors.agreeTerms && <span className={style.errorMessage}>{errors.agreeTerms}</span>}
          </div>
        <Link to="/payment" >
          <motion.button
            type="submit"
            className={style.continueButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className={style.spinner}></span> : 'Continue to Payment'}
          </motion.button>
          </Link>
        </motion.form>

        <motion.div 
          className={style.orderSummary}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Your Order</h3>
         
          <div className={style.summaryDivider}></div>
          <div className={style.summaryRow}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={style.summaryRow}>
            <span>Shipping</span>
            <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
          </div>
          {discount > 0 && (
            <div className={style.summaryRow}>
              <span>Discount</span>
              <span>-${discount}</span>
            </div>
          )}
          <div className={style.summaryDivider}></div>
          <div className={style.total}>
            <span>Total</span>
            <span>${total}</span>
          </div>
          <div className={style.securityBadge}>
            <svg className={style.lockIcon} viewBox="0 0 24 24">
              <path d="M12 1C8.676 1 6 3.676 6 7v1H4v14h16V8h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v1H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
            </svg>
            <span>Secure 256-bit SSL encrypted checkout</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </LayOut>

  );
  
}
