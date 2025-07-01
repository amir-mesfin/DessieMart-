import React from 'react';
import './header.css';
import logo from '../../assets/image/DessieMartLogo.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
  return (
    <header className="header">
      {/* Logo & Deliver */}
      <div className="header__left">
        <img src={logo} alt="DessieMart Logo" className="header__logo" />
        <div className="header__location">
          <LocationOnIcon />
          <div>
            <span className="small-text">Deliver to</span>
            <span className="bold-text">Ethiopia</span>
          </div>
        </div>
      </div>

      {/* Search bar with Select */}
      <div className="header__search">
        <select className="header__select">
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Kitchen</option>
          <option value="books">Books</option>
        </select>
        <input type="text" placeholder="Search DessieMart..." />
        <SearchIcon className="header__searchIcon" />
      </div>

      {/* Right section */}
      <div className="header__right">
        <div className="header__language">
          <img src="https://flagcdn.com/us.svg" alt="lang" className="flag" />
          <span>EN</span>
          <ArrowDropDownIcon />
        </div>

        <div className="header__navItem">
          <span className="small-text">Hello, Abushe</span>
          <span className="bold-text">Account & Lists</span>
        </div>

        <div className="header__navItem">
          <span className="small-text">Returns</span>
          <span className="bold-text">& Orders</span>
        </div>

        <div className="header__cart">
          <ShoppingCartIcon />
          <span className="bold-text">Cart</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
