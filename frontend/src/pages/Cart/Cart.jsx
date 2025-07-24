import React, { useContext } from 'react'
import LayOut from '../layOut/LayOut'
import { DataContext } from '../../component/dataProvider/DataProvider'
import ProductCard from '../product/ProductCard';
import { Link } from "react-router-dom";
import styles from './Cart.module.css'
import { ShoppingCartOutlined } from '@ant-design/icons'
import  UseTotalPrice from '../../component/currencyFormat/CurrencyFormat'
import CurrencyFormat from '../../component/currencyFormat/CurrencyFormat';
export default function Cart() {
  const [{basket, user}, dispatch] = useContext(DataContext);
  // console.log(basket);
  // Calculate total price
  const totalPrice = basket.reduce((sum, item) => { 
    return sum + (item.price * item.amount)
    },0)
    // console.log(totalPrice);

  return (
    <LayOut>
      <div className={styles.cartContainer}>
        <h2 className={styles.cartTitle}>YOUR SHOPPING BASKET</h2>
        <hr className={styles.divider} />
        
        {basket?.length === 0 ? (
          <div className={styles.emptyCart}>
            <ShoppingCartOutlined className={styles.emptyCartIcon} />
            <p>Your cart is empty</p>
            <p>Start shopping to add items to your cart</p>
          </div>
        ) : (
          <>
            <div className={styles.productGrid}>
              {basket?.slice(0).map((item,index) => (
               <ProductCard 
               product={item} 
               isCartItem={true}
               key={index}
              //  quantity={item.quantity}
              //  onRemove={handleRemove}
              //  onQuantityChange={handleQuantityChange}
             />
              ))}
            </div>
            
            <div className={styles.cartSummary}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>
              <div className={styles.totalAmount}>
                {/* Total: ${totalPrice.toFixed(2)} */}
                <CurrencyFormat amount={totalPrice} />
              </div>
              <Link to="/information">
              <button className={styles.checkoutButton}>
                Proceed to Checkout
              </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </LayOut>
  )
}