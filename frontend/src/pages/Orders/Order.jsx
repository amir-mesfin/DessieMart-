import React, { useState, useEffect, useContext } from 'react';
import LayOut from '../layOut/LayOut';
import { db } from '../../utility/firebase';
import { DataContext } from '../../component/dataProvider/DataProvider';
import style from './Order.module.css';
import { collection, doc, orderBy, onSnapshot, query } from "firebase/firestore";

export default function Order() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(doc(collection(db, "customer"), user.uid), "order"),
        orderBy("created", "desc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const order = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(order);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [user]);
   console.log(orders);
  const formatDate = (timestamp) => {
    try {
      if (!timestamp) return 'Date not available';
      
      // Handle both seconds and milliseconds timestamps
      const date = typeof timestamp === 'number' 
        ? new Date(timestamp * 1000) 
        : timestamp.toDate();
        
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return '#4CAF50';
      case 'shipped': return '#2196F3';
      case 'processing': return '#FF9800';
      case 'cancelled': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return (price - (price * discount / 100)).toFixed(2);
  };

  return (
    <LayOut>
      <section className={style.orderSection}>
        <div className={style.orderContainer}>
          <h1 className={style.orderTitle}>Your Orders</h1>
          
          {loading ? (
            <div className={style.loadingContainer}>
              <div className={style.spinner}></div>
              <p>Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className={style.emptyOrders}>
              <img src="/images/empty-orders.svg" alt="No orders" className={style.emptyImage} />
              <h3>No Orders Found</h3>
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className={style.orderList}>
              {orders?.map((eachOrder) => (
                <div key={eachOrder.id} className={style.orderCard}>
                  <div className={style.orderHeader}>
                    <div>
                      <span className={style.orderLabel}>Order #</span>
                      <span className={style.orderId}>{eachOrder.id}</span>
                    </div>
                    <div className={style.orderDate}>
                      {formatDate(eachOrder.created)}
                    </div>
                  </div>

                  {eachOrder.status && (
                    <div className={style.orderStatus} style={{ backgroundColor: getStatusColor(eachOrder.status) }}>
                      {eachOrder.status}
                    </div>
                  )}

                  <div className={style.orderItems}>
                    {eachOrder?.basket?.map((orderItem, index) => (
                      <div key={index} className={style.orderItem}>
                        <div className={style.itemImageContainer}>
                          <img 
                            src={orderItem.thumbnail || orderItem.images?.[0] || '/images/product-placeholder.png'} 
                            alt={orderItem.title} 
                            className={style.itemImage} 
                            onError={(e) => {
                              e.target.src = '/images/product-placeholder.png';
                            }}
                          />
                          <span className={style.itemQuantity}>{orderItem.amount}</span>
                        </div>
                        
                        <div className={style.itemDetails}>
                          <h4 className={style.itemTitle}>{orderItem.title}</h4>
                          <p className={style.itemCategory}>{orderItem.category}</p>
                          
                          <div className={style.priceContainer}>
                            {orderItem.discountPercentage > 0 && (
                              <>
                                <span className={style.originalPrice}>${orderItem.price}</span>
                                <span className={style.discountPercentage}>-{orderItem.discountPercentage}%</span>
                              </>
                            )}
                            <span className={style.finalPrice}>
                              ${orderItem.discountPercentage > 0 
                                ? calculateDiscountedPrice(orderItem.price, orderItem.discountPercentage) 
                                : orderItem.price}
                            </span>
                          </div>
                          
                          <div className={style.itemMeta}>
                            <span>SKU: {orderItem.sku}</span>
                            <span>Status: {orderItem.availabilityStatus}</span>
                          </div>
                        </div>
                        
                        <div className={style.itemTotal}>
                          ${(orderItem.price * orderItem.amount * (1 - orderItem.discountPercentage/100)).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={style.orderFooter}>
                    <div className={style.orderSummary}>
                      <div className={style.summaryRow}>
                        <span>Subtotal:</span>
                        <span>${eachOrder.basket?.reduce((sum, item) => 
                          sum + (item.price * item.amount * (1 - item.discountPercentage/100)), 0).toFixed(2)}
                        </span>
                      </div>
                      <div className={style.summaryRow}>
                        <span>Shipping:</span>
                        <span>Free</span>
                      </div>
                      <div className={style.summaryRow}>
                        <span>Tax:</span>
                        <span>$0.00</span>
                      </div>
                      <div className={style.summaryRowTotal}>
                        <span>Total:</span>
                        <span>${eachOrder.basket?.reduce((sum, item) => 
                          sum + (item.price * item.amount * (1 - item.discountPercentage/100)), 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className={style.orderActions}>
                      <button className={style.trackButton}>Track Order</button>
                      <button className={style.reorderButton}>Reorder</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}