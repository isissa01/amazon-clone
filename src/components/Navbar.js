import React from 'react'
import Button from "@material-ui/core/Button"
import SearchIcon from '@material-ui/icons/Search';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './Navbar.css';
import {Link} from 'react-router-dom';
import {useStateValue} from "../StateProvider";
import { auth } from '../config';




function Navbar() {
    //you get [state, dispatch] from useStateValue()
    const [{basket,userId, name}] = useStateValue();
    const logOut = () =>{
      if(userId){
        auth.signOut();
      }
      
    }
    return (
        <div className="header">
          <div className="header_logo">
            <Link to="/" >
              <img className="header_image" src="https://www.pinclipart.com/picdir/big/358-3584545_amazon-web-services-logo-png-transparent-svg-vector.png" alt="logo"></img>
            </Link>
          </div>

          <div className="header_search">
            <input className="header_searchInput" placeholder="Search" type='text'/>
            <SearchIcon  className="header_searchIcon"/>
          </div>
          <div className="header_nav">
            <Link to={!userId && "/login"} className="header_link" onClick={logOut}>
              <div className="header_option">
    <span className="header_optionOne">Hello, {name}</span>
    <span className="header_optionTwo">{ userId? ("Logout") : ("Sign In")}</span>
              </div>
            </Link>

            <Link to="/orders" className="header_link hide">
            <div className="header_option">
              <span className="header_optionOne">Returns</span>
              <span className="header_optionTwo">& Orders</span>
              </div>
            </Link>

            <Link to="/" className="header_link hide">
            <div className="header_option">
              <span className="header_optionOne">Your</span>
              <span className="header_optionTwo">Prime</span>
              </div>
            </Link>
          </div>

          <Link to="/checkout" className="header_link">
            <div className="header_backet">
              <ShoppingBasketIcon className="header_optionBacket"/>
                <span className="header_optionTwo header_backetCount">{basket?.length}</span>
              </div>
            </Link>
          

        </div>
    )
}

export default Navbar
