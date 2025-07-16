import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "./ProductCard"
import styles from './Product.module.css'
import LayOut from "../layOut/LayOut"
import {ProductUrl} from '../../Api/EndPoint'
import FadeLoaderComponent from "../../component/Loader/FadeLoaderComponent"
function Product() {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// console.log(categoryName);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${ProductUrl}/products/category/${categoryName}`);
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

  return (
    <LayOut>
      {loading? (<FadeLoaderComponent  />) : ( <div className={styles.productPage}>
                                                <h1 className={styles.categoryTitle}>{categoryName.replace('-', ' ')}</h1>
                                                <div className={styles.productGrid}>
                                                  {products.map(product => (
                                                    <ProductCard key={product.id} product={product} cata={categoryName}/>
                                                  ))}
                                                </div>
                                              </div>) }

    </LayOut>
  );
}

export default Product;