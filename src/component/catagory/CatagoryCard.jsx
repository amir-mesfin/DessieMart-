import React from 'react';
import styles from './CatagoryCard.module.css';

// Optional: if you still want to format the slug
function formatSlug(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function CatagoryCard({ title, products, linkUrl }) {
  // Expecting title to be an object like { slug, name, url }
  const displayTitle = title?.name || formatSlug(title?.slug) || 'UNKNOWN';

  // console.log("CatagoryCard props:", { title, products, linkUrl });

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
      <a href={linkUrl} className={styles.link}>Explore {displayTitle}</a>
    </div>
  );
}

export default CatagoryCard;
