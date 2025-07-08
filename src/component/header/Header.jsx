import React, { useContext, useEffect, useState } from 'react';
import './header.css';
import { Link } from "react-router-dom";
import logo from '../../assets/image/DessieMartLogo.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DataContext } from '../dataProvider/DataProvider';
import { ProductUrl } from '../../Api/EndPoint';

const Header = () => {
    const [{basket},dispatch] = useContext(DataContext);
    const [isCategory, setCategory]= useState([])
    useEffect(()=>{
      const  fetchCategory = async ()  =>{
          try{
            const res = await fetch(`${ProductUrl}/product/category-list`);
            if(!res.ok){
              throw new Error("failed to fetch category");
              
            }
            const data = await res.json();
            setCategory(data);

          }catch(err){
            throw new Error ("error happening");
          }
      };
      fetchCategory();

    }, []);


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
           {
             isCategory.map((item,index)=>{
               return   <option value="item" key={index}>{item}</option>
             })
           }
        </select>
        <input type="text" placeholder="Search DessieMart..." />
        <SearchIcon className="header__searchIcon" />
      </div>

      {/* Right section */}
      <div className="header__right">
        <div className="header__language">
          <img src="https://flagcdn.com/us.svg" alt="lang" className="flag" />
          <span>ETH</span>
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
        <Link to="/cart" >
            <div className="header__cart">
                <ShoppingCartIcon />
                <span className="cart-count">{basket.length}</span> {/* ← Add this */}
                <span className="bold-text">Cart</span>

            </div>
        </Link>
       


      </div>
    </header>
  );
};

export default Header;
