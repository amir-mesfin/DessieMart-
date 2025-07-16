import React from 'react';
import styles from './CatagoryCard.module.css';
import { Link } from "react-router-dom";

// Optional: if you still want to format the slug
function formatSlug(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function CatagoryCard({ title, products, linkUrl }) {
  const displayTitle = title?.name || formatSlug(title?.slug) || 'UNKNOWN';


  return (
    <div className={styles.card}>
      <h3>{displayTitle}</h3>
      <div className={styles.grid}>
        {products?.map(product => (
          <div className={styles.item} key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <p>{product.title}</p>
          </div>
        ))}
      </div>
      <Link to={`/product/${title.slug}`} className={styles.link}>
        Explore {displayTitle}
      </Link>

    </div>
  );
}

export default CatagoryCard;
