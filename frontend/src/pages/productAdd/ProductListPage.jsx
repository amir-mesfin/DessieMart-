import React, { useEffect, useState } from 'react';
import api from '../../Api/axiosConfig';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products', { params: { search } });
      setProducts(res.data);
    } catch (err) {
      toast.error('Failed to load products');
    }
  };

  useEffect(() => { fetchProducts(); }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      <Link to="/add-product"><button>Add Product</button></Link>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <strong>{p.title}</strong> - ${p.price}
            <button onClick={() => handleDelete(p._id)}>Delete</button>
            <Link to={`/edit-product/${p._id}`}><button>Edit</button></Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
