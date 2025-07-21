// src/pages/AdminDashboard.jsx
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../component/dataProvider/DataProvider'

const AdminDashboard = () => {
  const [{ user }] = useContext(DataContext);
  const navigate = useNavigate();

  if (!user) {
    return <p>Loading...</p>;
  }

  if (user.role !== 'admin') {
    // If not admin, redirect or show error
    navigate('/'); // redirect home
    return null;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>👑 Admin Dashboard</h1>
      <p>Welcome, {user.email}!</p>
      <p>Your role: {user.role}</p>

      <div>
        {/* Put any admin-only tools here */}
        <button>Add Product</button>
        <button>View Orders</button>
        <button>Manage Sellers</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
