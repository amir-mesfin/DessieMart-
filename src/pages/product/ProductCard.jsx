import React from 'react'; 
import styles from './ProductCard.module.css';
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { DataContext } from '../../component/dataProvider/DataProvider';
import { Type } from '../../utility/action.type';
import { IconButton, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function ProductCard({ product, isCartItem }) {
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    });
  };

  const incrementQuantity = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      id: product.id
    });
  };

  const decrementQuantity = () => {
    dispatch({
      type: Type.DECREMENT_ITEM,
      id: product.id
    });
  };

  const cartDescription = {
    id: product.id,
    isCartItems: isCartItem
  };

  return (
    <div className={`${styles.productCard} ${isCartItem ? styles.cartItem : ''}`}>
      <div className={styles.imageWrapper}>
        <Link to={{pathname:`/productDescriptions/${product.id}`}} state={{ cartDescription }}>
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className={styles.productImage}
          />
          {!isCartItem && <div className={styles.hoverInfo}>Click for more info</div>}
        </Link>
      </div>

      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{product.title}</h2>
        
        <div className={styles.ratingContainer}>
          <div className={styles.starRating}>
            <Rating value={product.rating} precision={0.1} readOnly size={isCartItem ? "small" : "medium"} />
          </div>
          <span className={styles.ratingCount}>{product.rating.toFixed(1)}</span>
        </div>

        <div className={styles.priceContainer}>
          {product.discountPercentage > 0 && (
            <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
          )}
          <span className={styles.currentPrice}>${discountedPrice.toFixed(2)}</span>
          {product.discountPercentage > 0 && !isCartItem && (
            <span className={styles.discountPercentage}>({product.discountPercentage}% off)</span>
          )}
        </div>

        {!isCartItem && (
          <>
            {product.stock > 0 ? (
              <span className={styles.inStock}>In Stock</span>
            ) : (
              <span className={styles.outOfStock}>Out of Stock</span>
            )}
          </>
        )}

        {!isCartItem ? (
          <button className={styles.addToCartBtn} onClick={addToCart}>
            Add to Cart
          </button>
        ) : (
          <Box className={styles.quantityControl}>
            <IconButton 
              size="small" 
              onClick={()=>decrementQuantity(item.id)}
              disabled={product.amount <= 1}
              className={styles.quantityButton}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            
            <Typography variant="body1" className={styles.quantityValue}>
              {product.amount}
            </Typography>
            
            <IconButton 
              size="small" 
              onClick={()=>incrementQuantity(item)}
              className={styles.quantityButton}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </div>
    </div>
  );
}

export default ProductCard;