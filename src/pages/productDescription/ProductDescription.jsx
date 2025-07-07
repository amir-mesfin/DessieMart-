import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import styles from "./ProductDescription.module.css";
import LayOut from "../layOut/LayOut";
import {ProductUrl} from '../../Api/EndPoint'
import Rating from '@mui/material/Rating';
import { useLocation } from 'react-router-dom';
import FadeLoaderComponent from "../../component/Loader/FadeLoaderComponent";

function ProductDescription() {
  const location = useLocation();
  const { productId } = useParams(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [singleProduct, setSingleProduct] = useState(null);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const ProductCart = location.state?.cartDescription;
  const {isCartItems} = ProductCart || {};

  useEffect(() => {
    const fetchSingleProductById = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${ProductUrl}/products/${productId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setSingleProduct(data);
        setMainImage(data.thumbnail);
        setError(null);
      } catch (err) {
        setError(err.message);
        setSingleProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProductById();
  }, [productId]);

  // Show loader while loading
  if (loading) {
    return (
      <LayOut>
        <FadeLoaderComponent />
      </LayOut>
    );
  }

  // Show error if there is one
  if (error) {
    return (
      <LayOut>
        <div className={styles.error}>
          <p>Error: {error}</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </LayOut>
    );
  }

  // Only show "not found" if we're done loading and there's no product
  if (!loading && !singleProduct) {
    return (
      <LayOut>
        <div className={styles.error}>
          <p>Product not found</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </LayOut>
    );
  }

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    images,
  } = singleProduct;

  const discountedPrice = (
    price -
    (price * discountPercentage) / 100
  ).toFixed(2);

  return ( 
    <LayOut>
      <div className={styles.productContainer}>
        {/* ← Back Button */}
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="Go back to previous page"
        >
          ← Back
        </button>

        <div className={styles.productGallery}>
          <div className={styles.mainImage}>
            <img src={mainImage} alt={title} />
          </div>
          <div className={styles.thumbnailContainer}>
            {images.map((img, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${
                  mainImage === img ? styles.activeThumbnail : ""
                }`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`${title} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.productDetails}>
          <h1>{title}</h1>
          <div className={styles.brandCategory}>
            <span>Brand: {brand}</span>
            <span>Category: {category}</span>
          </div>

          <div className={styles.ratingStock}>
            <div className={styles.rating}>
              <Rating value={rating} precision={0.1} readOnly />
              <span>({rating})</span>
            </div>
            <div className={styles.stock}>
              {stock > 0 ? (
                <span className={styles.inStock}>In Stock ({stock} available)</span>
              ) : (
                <span className={styles.outOfStock}>Out of Stock</span>
              )}
            </div>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.currentPrice}>
              ${discountedPrice}
              {discountPercentage > 0 && (
                <span className={styles.discountBadge}>
                  -{discountPercentage}%
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <div className={styles.originalPrice}>${price}</div>
            )}
          </div>

          <div className={styles.description}>
            <h3>Description</h3>
            <p>{description}</p>
          </div>

          {!isCartItems && (
            <div className={styles.actionButtons}>
              <button
                className={styles.addToCart}
                disabled={stock <= 0}
              >
                Add to Cart
              </button>
              <button
                className={styles.buyNow}
                disabled={stock <= 0}
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      </div>
    </LayOut>
  );
}

export default ProductDescription;