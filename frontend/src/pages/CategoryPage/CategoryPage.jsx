// src/components/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../Api/axiosConfig';
import styles from './CategoryPage.module.css';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiLoader } from 'react-icons/fi';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('categories');
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch categories:', {
        status: error.response?.status,
        data: error.response?.data
      });
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      if (currentCategory) {
        await api.put(`/categories/${currentCategory._id}`, formData);
        toast.success('Category updated successfully');
      } else {
        await api.post('/categories', formData);
        toast.success('Category created successfully');
      }
      closeModal();
      fetchCategories();
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response && error.response.status === 409) {
        // Assuming your API returns 409 for duplicate entries
        toast.error('This category already exists!');
        setErrors(prev => ({ ...prev, name: 'A category with this name already exists' }));
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await api.delete(`/categories/${id}`);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const openModal = (category = null) => {
    setCurrentCategory(category);
    setFormData({
      name: category?.name || '',
      description: category?.description || ''
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Category Management</h1>
        <button 
          className={styles.createButton}
          onClick={() => openModal()}
        >
          <FiPlus className={styles.icon} /> New Category
        </button>
      </div>

      {isLoading ? (
        <div className={styles.loading}>
          <FiLoader className={styles.spinner} /> Loading categories...
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map(category => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.description || '-'}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.editButton}
                          onClick={() => openModal(category)}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(category._id)}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className={styles.noData}>
                    No categories found. Create one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{currentCategory ? 'Edit Category' : 'Create Category'}</h2>
              <button onClick={closeModal} className={styles.closeButton}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.formGroup}>
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? styles.errorInput : ''}
                  required
                  placeholder="Enter category name"
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter category description (optional)"
                  rows="4"
                />
              </div>
              <div className={styles.formActions}>
                <button 
                  type="button" 
                  onClick={closeModal}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                >
                  {currentCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;