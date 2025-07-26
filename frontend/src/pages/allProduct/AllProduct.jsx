import React, { useEffect, useState } from "react"
import ProductCard from "../product/ProductCard"
import styles from './all.module.css'
import LayOut from "../layOut/LayOut"
import {ProductUrl} from '../../Api/EndPoint'
import FadeLoaderComponent from "../../component/Loader/FadeLoaderComponent"
function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${ProductUrl}/products`);
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
  }, []);

  return (
    <LayOut>
      {loading? (<FadeLoaderComponent  />) : ( <div className={styles.productPage}>
                                                <h1 className={styles.categoryTitle}> All Products</h1>
                                                <div className={styles.productGrid}>
                                                  {products.map(product => (
                                                    <ProductCard key={product.id} product={product} />
                                                  ))}
                                                </div>
                                              </div>) }

    </LayOut>
  );
}

export default AllProduct;