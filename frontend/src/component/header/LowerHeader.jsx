import React,{useContext} from 'react';
import './LowerHeader.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { DataContext } from '../dataProvider/DataProvider';
import { auth } from '../../utility/firebase';

const LowerHeader = () => {
  const [{user}]=useContext(DataContext);
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
          <Link className="Link_css" to={!user&&"/auth"}>
          <div  className="lower-header__item">
               {user?( <span onClick={()=>{
                   auth.signOut();
               }}>Sign Out</span>):(<span>Registry</span>)}
          </div>
          </Link>
        
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
