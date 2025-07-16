import React, { useContext } from 'react';
import LayOut from '../layOut/LayOut';
import style from './Payment.module.css';
import { DataContext } from '../../component/dataProvider/DataProvider';

export default function Payment() {
  const [{user,basket},dispatch] = useContext(DataContext);
  const totalItemInTheCart = basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
  return (
    <LayOut>
      <div className={style.paymentPage}>
        {/* Checkout Header */}
        <div className={style.checkoutHeader}>
          <h1>Checkout ({totalItemInTheCart}) items</h1>
          <div className={style.steps}>
            <span className={style.activeStep}>Cart</span>
            <span className={style.stepArrow}>→</span>
            <span className={style.activeStep}>Information</span>
            <span className={style.stepArrow}>→</span>
            <span className={style.currentStep}>Payment</span>
          </div>
        </div>

        {/* Main Content */}
        <div className={style.mainContent}>
          {/* Payment Methods */}
          <div className={style.paymentSection}>
            <h2>Payment Method</h2>
            
            <div className={style.paymentMethods}>
              <div className={`${style.method} ${style.activeMethod}`}>
                <div className={style.methodIcon}>💳</div>
                <span>Credit Card</span>
              </div>
              <div className={style.method}>
                <div className={style.methodIcon}>📱</div>
                <span>Mobile Payment</span>
              </div>
              <div className={style.method}>
                <div className={style.methodIcon}>P</div>
                <span>PayPal</span>
              </div>
            </div>

            {/* Credit Card Form */}
            <div className={style.cardForm}>
              <div className={style.cardPreview}>
                <div className={style.cardLogo}>VISA</div>
                <div className={style.cardNumber}>•••• •••• •••• 4242</div>
                <div className={style.cardDetails}>
                  <span>JOHN DOE</span>
                  <span>12/25</span>
                </div>
              </div>

              <form className={style.form}>
                <div className={style.formGroup}>
                  <label>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" />
                </div>

                <div className={style.formGroup}>
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>

                <div className={style.formRow}>
                  <div className={style.formGroup}>
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className={style.formGroup}>
                    <label>CVV</label>
                    <input type="text" placeholder="123" />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className={style.orderSummary}>
            <h2>Order Summary</h2>
            
            <div className={style.summaryItem}>
              <span>Premium Headphones</span>
              <span>$199.99</span>
            </div>
            
            <div className={style.summaryItem}>
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            
            <div className={style.summaryItem}>
              <span>Tax</span>
              <span>$14.00</span>
            </div>
            
            <div className={style.divider}></div>
            
            <div className={style.total}>
              <span>Total</span>
              <span>$213.99</span>
            </div>
            
            <button className={style.payButton}>Pay Now</button>
            
            <div className={style.securityNote}>
              <span>🔒 Secure payment</span>
              <span>256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </LayOut>
  );
}