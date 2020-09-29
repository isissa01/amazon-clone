import React, {forwardRef} from 'react';
import StarIcon from '@material-ui/icons/Star';
import {useStateValue} from '../StateProvider';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
const OrderItem = forwardRef( ({item}, ref) =>{
    const [{}, dispatch] = useStateValue();
    
    const addToBasket = () => {
        //add item to basket
        dispatch({
          type: "ADD_TO_BASKET",
          item
        });
      }
    
    return (
        <div ref={ref} className="order_item" >
            <img 
            src = {item.image}
            alt=""
            className="order_itemImage" />

            <div className="order_itemDetails">

                <p className="order_itemTitle">{item.title}</p>
                <p className="sold_by">Sold by: <Link to="/">Amazon.com Services LLC</Link></p>
                <Link to="/orders" className="return">Return and product support eligibility</Link>
                <p className="order_itemPrice">$<CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true}  renderText={value => <span>{value}</span>} /></p>
                <div className="order_buttons">
                    <button onClick={addToBasket}>Buy it again</button> 
                    <Link className="view_item">View your item</Link>
                </div>


                
            </div>
            
            
        </div>
    )
});

export default OrderItem
