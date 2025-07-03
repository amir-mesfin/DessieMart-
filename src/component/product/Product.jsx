import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import styles from './Product.module.css';

function Product() {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(categoryName);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.productPage}>
      <h1 className={styles.categoryTitle}>{categoryName.replace('-', ' ')}</h1>
      <div className={styles.productGrid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} cata={categoryName}/>
        ))}
      </div>
    </div>
  );
}

export default Product;