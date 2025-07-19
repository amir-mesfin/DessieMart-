import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../Api/axiosConfig';
import styles from './ProductAddPage.module.css'; // reuse same style

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get('/categories')
        ]);
        const product = prodRes.data;
        setCategories(catRes.data);

        // Populate fields
        setValue('title', product.title);
        setValue('description', product.description);
        setValue('category', product.category);
        setValue('brand', product.brand);
        setValue('price', product.price);
        setValue('discountPercentage', product.discountPercentage);
        setValue('stock', product.stock);
        setThumbnailPreview(product.thumbnail);
        setImagePreviews(product.images);
      } catch (err) {
        toast.error('Failed to load product');
      }
    };
    fetchProductAndCategories();
  }, [id, setValue]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
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
        if (previews.length === files.length) setImagePreviews(previews);
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('brand', data.brand);
      formData.append('price', data.price);
      formData.append('discountPercentage', data.discountPercentage || 0);
      formData.append('stock', data.stock || 0);

      if (data.thumbnail?.length > 0) formData.append('thumbnail', data.thumbnail[0]);
      if (data.thumbnailUrl) formData.append('thumbnailUrl', data.thumbnailUrl);

      if (data.images?.length > 0) {
        Array.from(data.images).forEach(f => formData.append('images', f));
      }
      if (data.imagesUrls) {
        const urls = data.imagesUrls.split(',').map(u => u.trim());
        formData.append('imagesUrls', JSON.stringify(urls));
      }

      await api.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Product updated!');
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input placeholder="Title" {...register('title', { required: true })} />
        <textarea placeholder="Description" {...register('description', { required: true })} />
        <select {...register('category', { required: true })}>
          <option value="">Select category</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input placeholder="Brand" {...register('brand', { required: true })} />
        <input type="number" placeholder="Price" {...register('price', { required: true })} />
        <input type="number" placeholder="Discount %" {...register('discountPercentage')} />
        <input type="number" placeholder="Stock" {...register('stock')} />

        {/* Thumbnail */}
        <input type="file" accept="image/*" {...register('thumbnail')} onChange={handleThumbnailChange} />
        <input type="url" placeholder="Thumbnail URL (optional)" {...register('thumbnailUrl')} />

        {/* Images */}
        <input type="file" accept="image/*" multiple {...register('images')} onChange={handleImagesChange} />
        <input placeholder="Image URLs, comma separated" {...register('imagesUrls')} />

        {/* Previews */}
        {thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail preview" width={100} />}
        {imagePreviews.map((src, i) => <img key={i} src={src} alt={`Preview ${i}`} width={80} />)}

        <button type="submit" disabled={isLoading}>{isLoading ? 'Updating...' : 'Update Product'}</button>
      </form>
    </div>
  );
};

export default EditProductPage;
