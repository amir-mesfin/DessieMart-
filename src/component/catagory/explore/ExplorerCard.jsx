import React from 'react';
import styles from './ExplorerCard.module.css';

function ExplorerCard({ product }) {
  return (
    <div className={styles.card}>
      <img src={product.thumbnail} alt={product.title} className={styles.image} />
      <h4 className={styles.title}>{product.title}</h4>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>${product.price}</p>
    </div>
  );
}

export default ExplorerCard;
