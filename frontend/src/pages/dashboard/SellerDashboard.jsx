// src/pages/AdminDashboard.jsx
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../component/dataProvider/DataProvider'

const SellerDashboard = () => {
  const [{ user }] = useContext(DataContext);
  const navigate = useNavigate();

  if (!user) {
    return <p>Loading...</p>;
  }

  if (user.role !== 'seller') {
    // If not admin, redirect or show error
    navigate('/'); // redirect home
    return null;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>👑</h1>
      <p>Welcome, {user.email}!</p>
      <p>Your role: {user.role}</p>

      <div>
        {/* Put any admin-only tools here */}
        <button>View Orders</button>
        <button>Manage Sellers</button>
        <p>abushe seller nw </p>
      </div>
    </div>
  );
};

export default SellerDashboard;
