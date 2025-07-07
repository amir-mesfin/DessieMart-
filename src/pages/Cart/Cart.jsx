import React, { useContext } from 'react'
import LayOut from '../layOut/LayOut'
import { DataContext } from '../../component/dataProvider/DataProvider'
import ProductCard from '../product/ProductCard';
import styles from './Cart.module.css'
import { ShoppingCartOutlined } from '@ant-design/icons'; // or any other icon library

export default function Cart() {
  const [{basket, user}, dispatch] = useContext(DataContext);
  
  // Calculate total price
  const totalPrice = basket?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

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
              {basket?.slice(0).map((item) => (
               <ProductCard 
               product={item} 
               isCartItem={true}
              //  quantity={item.quantity}
              //  onRemove={handleRemove}
              //  onQuantityChange={handleQuantityChange}
             />
              ))}
            </div>
            
            <div className={styles.cartSummary}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>
              <div className={styles.totalAmount}>
                Total: ${totalPrice.toFixed(2)}
              </div>
              <button className={styles.checkoutButton}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </LayOut>
  )
}