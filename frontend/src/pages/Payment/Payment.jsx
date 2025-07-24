import React, { useContext, useState } from 'react';
import LayOut from '../layOut/LayOut';
import style from './Payment.module.css';
import { DataContext } from '../../component/dataProvider/DataProvider';
import {
  useStripe, 
  useElements, 
  CardElement
} from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../Api/axiosConfig'
import ClipLoader from 'react-spinners/ClipLoader';
import {db} from '../../utility/firebase'
import { doc, setDoc } from "firebase/firestore";
import { Type } from '../../utility/action.type';
export default function Payment() {
  const [{ user, basket, fast_buy }, dispatch] = useContext(DataContext);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  let { checking } = location.state || false; 
  const totalItemInTheCart =  checking? "one":(basket?.reduce((amount, item) => {
    return item.amount + amount
  }, 0))

  const totalPrice =checking? fast_buy[0].price :(basket.reduce((sum, item) => { 
    return sum + (item.price * item.amount);
  }, 0))
// console.log(fast_buy);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

     try{

      // contact the client secrete 
         const response = await api.post('/payment/create', { total: totalPrice });
        //  console.log(total);
        //  console.log(response.data);
         const clientSecret=response.data.clientSecret;
      // client side conformation
       console.log("Received clientSecret:", clientSecret)

         const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(
          clientSecret,
                    {
                      payment_method: {
                        card: elements.getElement(CardElement)
                      }
                    }
          );

          if (stripeError) {
            console.error("Stripe confirm error:", stripeError);
            setError(stripeError.message);
            setProcessing(false);
            return;
          }
        //  console.log(paymentIntent);
        //  console.log(user.uid);
        //  console.log(paymentIntent.id);
        //  console.log(paymentIntent.amount);
        //  console.log(paymentIntent.created);
         try {
            const orderDocRef = doc(db, "customer", user.uid, "order", paymentIntent.id);
            await setDoc(orderDocRef, {
              basket: checking? fast_buy : basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created
            });
          // console.log(" Order saved to Firestore!");
        } catch (firebaseError) {
          console.error("❌ Error saving order to Firestore:", firebaseError);
          setError("Error saving order to your order history. Please contact support.");
        }
        

        if(checking){
          checking=false;
        }else{
          dispatch({type:Type.EMPTY_BASKET});
        }
           
        setProcessing(false);
        navigate("/order");
      

     }catch(err){
      console.log(err);
      setProcessing(false);
      
     }
    
  };

  const CARD_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

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
            </div>

            {/* Credit Card Form */}
            <div className={style.cardForm}>
              <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.formGroup}>
                  <label>Card Details</label>
                  <div className={style.cardElementContainer}>
                    <CardElement options={CARD_OPTIONS} />
                  </div>
                </div>

                {error && (
                  <div className={style.errorMessage}>
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className={style.orderSummary}>
            <h2>Order Summary</h2>
            
           {checking?(
                <div className={style.summaryItem}>
                  <span>{fast_buy[0].title} (x{1})</span>
                  <span>${fast_buy[0].price.toFixed(2)}</span>
                </div>
                ) : (
                  basket.map(item => (
                    <div key={item.id} className={style.summaryItem}>
                      <span>{item.title} (x{item.amount})</span>
                      <span>${(item.price * item.amount).toFixed(2)}</span>
                    </div>
                  ))
             )}
            
            <div className={style.summaryItem}>
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            
            <div className={style.summaryItem}>
              <span>Tax</span>
              <span>${(totalPrice * 0.1).toFixed(2)}</span>
            </div>
            
            <div className={style.divider}></div>
            
            <div className={style.total}>
              <span>Total</span>
              <span>${(totalPrice * 1.1).toFixed(2)}</span>
            </div>
            
            <button 
              className={style.payButton} 
              onClick={handleSubmit}
              disabled={!stripe || processing}
            >
              {processing ? <ClipLoader  color="white" size={14} />  : 'Pay Now'}
            </button>
            
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