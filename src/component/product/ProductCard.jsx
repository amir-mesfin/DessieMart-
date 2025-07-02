import React from 'react';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  
  return (
    <div className={styles.productCard}>
      <a href={`/product/${product.id}`}>
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className={styles.productImage}
        />
      </a>
      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{product.title}</h2>
        <div className={styles.ratingContainer}>
          <div className={styles.starRating}>
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={i < Math.floor(product.rating) ? styles.filledStar : styles.emptyStar}
              >
                ★
              </span>
            ))}
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
      </div>
    </div>
  );
}

export default ProductCard;