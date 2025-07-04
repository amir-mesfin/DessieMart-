import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import styles from "./ProductDescription.module.css";
import LayOut from "../layOut/LayOut";

function ProductDescription() {
  const { id } = useParams();
  const navigate = useNavigate();  // <-- Initialize navigate

  const [loading, setLoading] = useState(true);
  const [singleProduct, setSingleProduct] = useState(null);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchSingleProductById = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setSingleProduct(data);
        setMainImage(data.thumbnail);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProductById();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading product details...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!singleProduct) {
    return <div className={styles.error}>Product not found</div>;
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
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={i < Math.floor(rating) ? styles.filled : ""}
                      >
                        {i < rating ? "★" : "☆"}
                      </span>
                    ))}
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

                {/* Add to Cart button (non-functional) */}
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
              </div>
            </div>
    </LayOut>
  );
}

export default ProductDescription;
