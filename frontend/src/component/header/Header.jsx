import React, { useContext, useEffect, useState } from 'react';
import './header.css';
import { Link } from "react-router-dom";
import logo from '../../assets/image/DessieMartLogo.png';
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { DataContext } from '../dataProvider/DataProvider'
import { ProductUrl } from '../../Api/EndPoint'
import {auth} from '../../utility/firebase'
const Header = () => {
    const [{basket,user},dispatch] = useContext(DataContext);
    const totalItemInTheCart = basket?.reduce((amount,item)=>{
      return item.amount + amount
    },0)
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
        <Link className='header_img' to="/"> 
          <img src={logo} alt="DessieMart Logo" className="header__logo" /> 
         </Link>
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
        <Link to={!user && "/auth" } className="link_account">
                {
                  user? (<div className="header__navItem">
                    <span className="small-text">
                     Hello { user?.email?.split("@")[0]}
                  </span>
                  <span className="bold-text" onClick={()=>{
                      auth.signOut();
                  }}>Sign Out</span>
                  </div>
              ):(
                <div className="header__navItem">
                    <span className="small-text"> Hello Sign In</span>
                    <span className="bold-text">Account & Lists</span> 
                  </div>

              )
                }
                
              
        </Link>
       
        <Link className="cart_Link" to="/order">
        <div className="header__navItem">
            <span className="small-text">Returns</span>
            <span className="bold-text">& Orders</span>
          </div>
        </Link>
    
        <Link  className="cart_Link" to="/cart" >
            <div className="header__cart">
            <ShoppingCartIcon style={{ color: "white" }} />
                <span className="cart-count">{totalItemInTheCart}</span> {/* ← Add this */}
                <span className="bold-text">Cart</span>

            </div>
        </Link>
       


      </div>
    </header>
  );
};

export default Header;
