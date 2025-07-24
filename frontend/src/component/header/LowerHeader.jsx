import React from 'react';
import './LowerHeader.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
const LowerHeader = () => {
  return (
    <div className="lower-header">
      <div className="lower-header__content">
        <Link  className="Link_css" to="/all_product">
            <div className="lower-header__item all-menu">
              <MenuIcon />
              <span>All</span>
            </div>
        </Link>
        
          <div  className="lower-header__item">
           Today’s Deals
          </div>
          <div  className="lower-header__item">
          Customer Service
          </div>
          <div  className="lower-header__item">
          Registry
          </div>
          <div  className="lower-header__item">
          Gift Cards
          </div>
          <div  className="lower-header__item">
            Sell
          </div>
      </div>
    </div>
  );
};

export default LowerHeader;
