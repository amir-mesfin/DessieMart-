import React from 'react'; 
import styles from './ProductCard.module.css';
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

  return (
    <div className={styles.productCard}>
      
      <div className={styles.imageWrapper}>
        <Link to={`/productDescriptions/${product.id}`}>
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className={styles.productImage}
          />
          <div className={styles.hoverInfo}>Click for more info</div>
        </Link>
      </div>

      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{product.title}</h2>
        
        <div className={styles.ratingContainer}>
          <div className={styles.starRating}>
            <Rating value={product.rating} precision={0.1} />
          </div>
          <span className={styles.ratingCount}>{product.rating.toFixed(1)}</span>
        </div>

        <div className={styles.priceContainer}>
          {product.discountPercentage > 0 && (
            <>
              <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
              <span className={styles.discountPercentage}>({product.discountPercentage}% off)</span>
            </>
          )}
          <span className={styles.currentPrice}>${discountedPrice.toFixed(2)}</span>
        </div>

        {product.stock > 0 ? (
          <span className={styles.inStock}>In Stock</span>
        ) : (
          <span className={styles.outOfStock}>Out of Stock</span>
        )}

        {/* New button added */}
        <button className={styles.addToCartBtn}>Quick View</button>
      </div>
    </div>
  );
}

export default ProductCard;
