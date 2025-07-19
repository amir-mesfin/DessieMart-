import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../Api/axiosConfig';
import styles from './ProductAddPage.module.css';

const ProductAddPage = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [categories, setCategories] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const thumbnailSource = watch('thumbnailSource');
  const imagesSource = watch('imagesSource');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      
      // Append basic fields
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('brand', data.brand);
      formData.append('price', data.price);
      formData.append('discountPercentage', data.discountPercentage || 0);
      formData.append('stock', data.stock || 0);

      // Handle thumbnail
      if (data.thumbnailSource === 'file' && data.thumbnail?.[0]) {
        formData.append('thumbnail', data.thumbnail[0]);
      } else if (data.thumbnailSource === 'url' && data.thumbnailUrl) {
        formData.append('thumbnailUrl', data.thumbnailUrl);
      }

      // Handle additional images
      if (data.imagesSource === 'file' && data.images?.length > 0) {
        Array.from(data.images).forEach((image) => {
          formData.append('images', image);
        });
      } else if (data.imagesSource === 'url' && data.imagesUrls) {
        formData.append('imagesUrls', data.imagesUrls);
      }

      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Product added successfully!');
      reset();
      setThumbnailPreview('');
      setImagePreviews([]);
      navigate('/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Add New Product</h1>
          <p className={styles.subtitle}>Fill in the details below to add a new product to your store</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.grid}>
            {/* Product Title */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Product Title *</label>
              <input
                type="text"
                {...register('title', { required: 'Product title is required' })}
                className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                placeholder="Enter product title"
              />
              {errors.title && <p className={styles.errorText}>{errors.title.message}</p>}
            </div>
            
            {/* Category */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Category *</label>
              <select
                {...register('category', { required: 'Category is required' })}
                className={`${styles.input} ${errors.category ? styles.inputError : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              {errors.category && <p className={styles.errorText}>{errors.category.message}</p>}
            </div>
            
            {/* Brand */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Brand *</label>
              <input
                type="text"
                {...register('brand', { required: 'Brand is required' })}
                className={`${styles.input} ${errors.brand ? styles.inputError : ''}`}
                placeholder="Enter brand name"
              />
              {errors.brand && <p className={styles.errorText}>{errors.brand.message}</p>}
            </div>
            
            {/* Price */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Price *</label>
              <div className={styles.inputWithSymbol}>
                <span className={styles.currencySymbol}>$</span>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 0.01, message: 'Price must be greater than 0' }
                  })}
                  className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && <p className={styles.errorText}>{errors.price.message}</p>}
            </div>
            
            {/* Discount Percentage */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Discount Percentage</label>
              <div className={styles.inputWithSymbol}>
                <span className={styles.percentageSymbol}>%</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  {...register('discountPercentage')}
                  className={styles.input}
                  placeholder="0"
                />
              </div>
            </div>
            
            {/* Stock */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Stock Quantity</label>
              <input
                type="number"
                min="0"
                {...register('stock')}
                className={styles.input}
                placeholder="0"
              />
            </div>
          </div>
          
          {/* Description */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Description *</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
              placeholder="Enter detailed product description"
              rows="5"
            />
            {errors.description && <p className={styles.errorText}>{errors.description.message}</p>}
          </div>
          
          {/* Thumbnail Selection */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Thumbnail Image *</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  {...register('thumbnailSource', { required: true })}
                  value="file"
                  defaultChecked
                />
                Upload File
              </label>
              <label>
                <input
                  type="radio"
                  {...register('thumbnailSource', { required: true })}
                  value="url"
                />
                Use URL
              </label>
            </div>

            {thumbnailSource === 'file' ? (
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  accept="image/*"
                  {...register('thumbnail', { 
                    required: thumbnailSource === 'file' ? 'Thumbnail is required' : false
                  })}
                  onChange={handleThumbnailChange}
                  className={styles.fileInput}
                />
                {errors.thumbnail && <p className={styles.errorText}>{errors.thumbnail.message}</p>}
                {thumbnailPreview && (
                  <div className={styles.filePreview}>
                    <img src={thumbnailPreview} alt="Thumbnail preview" />
                  </div>
                )}
              </div>
            ) : (
              <input
                type="text"
                {...register('thumbnailUrl', { 
                  required: thumbnailSource === 'url' ? 'Thumbnail URL is required' : false,
                  pattern: {
                    value: /^(https?:\/\/).+\.(jpg|jpeg|png|webp)$/i,
                    message: 'Enter a valid image URL (JPEG, PNG, WebP)'
                  }
                })}
                className={`${styles.input} ${errors.thumbnailUrl ? styles.inputError : ''}`}
                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
              />
            )}
            {errors.thumbnailUrl && <p className={styles.errorText}>{errors.thumbnailUrl.message}</p>}
          </div>
          
          {/* Additional Images Selection */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Additional Images</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  {...register('imagesSource')}
                  value="file"
                  defaultChecked
                />
                Upload Files
              </label>
              <label>
                <input
                  type="radio"
                  {...register('imagesSource')}
                  value="url"
                />
                Use URLs
              </label>
            </div>

            {imagesSource === 'file' ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  {...register('images')}
                  onChange={handleImagesChange}
                  className={styles.fileInput}
                />
                {imagePreviews.length > 0 && (
                  <div className={styles.imagePreviews}>
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className={styles.imagePreview}>
                        <img src={preview} alt={`Preview ${index}`} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <textarea
              {...register('imagesUrls', {
                validate: (value) => {
                  if (!value) return true; // Optional field
                  const urlPattern = /^https?:\/\/.+\.(jpe?g|png|webp)(\s*,\s*https?:\/\/.+\.(jpe?g|png|webp))*$/i;
                  return urlPattern.test(value) || 'Enter valid image URLs separated by commas';
                }
              })}
              className={`${styles.textarea} ${errors.imagesUrls ? styles.inputError : ''}`}
              placeholder="Enter image URLs separated by commas (e.g., https://example.com/image1.jpg, https://example.com/image2.png)"
              rows="3"
            />
            )}
            {errors.imagesUrls && <p className={styles.errorText}>{errors.imagesUrls.message}</p>}
          </div>
          
          {/* Form Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => navigate('/products')}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddPage;