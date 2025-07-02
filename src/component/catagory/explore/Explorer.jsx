import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Explorer.module.css';
import ExplorerCard from './ExplorerCard';

function Explorer() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [category]);

  return (
    <div className={styles.explorerWrapper}>
      <h2 className={styles.title}>Explore {category.replace(/-/g, ' ').toUpperCase()}</h2>
      <div className={styles.grid}>
        {products.map(product => (
          <ExplorerCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Explorer;
