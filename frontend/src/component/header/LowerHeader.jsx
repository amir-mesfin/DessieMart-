import React from 'react';
import './LowerHeader.css';
import MenuIcon from '@mui/icons-material/Menu';

const LowerHeader = () => {
  const menuItems = [
    'All',
    'Today’s Deals',
    'Customer Service',
    'Registry',
    'Gift Cards',
    'Sell',
  ];

  return (
    <div className="lower-header">
      <div className="lower-header__content">
        <div className="lower-header__item all-menu">
          <MenuIcon />
          <span>All</span>
        </div>
        {menuItems.slice(1).map((item, index) => (
          <div key={index} className="lower-header__item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowerHeader;
