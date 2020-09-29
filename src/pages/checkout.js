import React, { useState } from 'react';
import './Checkout.css';
import {useStateValue} from '../StateProvider';
import { useHistory } from "react-router-dom";
import FlipMove from 'react-flip-move';

import Item from '../components/Item';
import { forwardRef } from 'react';

import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';

function Checkout() {
    const [{basket, userId}] = useStateValue();
    const history = useHistory();
    const [subTotal, setSubTotal] = useState(0);
    
    const goToCheckout = () =>{
        if(userId){
            history.push("/payment");
        }
        else{
            history.push("/login");
        }
    }
    

    
    return (
    
        <div className="checkout">
            <div className="checkout_row">
                <div className="checkout_main">
                    
                    
                    {basket.length === 0 ? (
                        <div className="checkout_noItems">
                            <h2>Your Shopping Basket is empty</h2>
                        <p>You have no items in your basket. To buy one or more items, click "Add to basket" next to the item.</p>
                        </div>
                        
                    ) : (
                        <div className="checkout_items">
                            <div className="checkout_mainHeader">
                                <h1>Shopping Cart</h1>
                                <p>Price</p>
                            </div>
                            <FlipMove>
                            {basket.map(item =>(
                                <Item item={item} key={item.id}/>
                    ))}
                    </FlipMove>
                        <div className="main_subtotal">
                        <p className="checkout_subTotal_text">Subtotal ({basket?.length} item{basket?.length > 1 ? "s" : ""}): <CurrencyFormat value={getBasketTotal(basket)} displayType={'text'} thousandSeparator={true} decimalScale={2}  prefix={'$'} renderText={value => <strong>{value}</strong>} /></p>
                        </div>
                        </div>
                        
                        
                    ) }

                </div>


                {basket?.length > 0?  (
                    <div className="checkout_side" >
                        <div className="checkout_subTotal">
                            <p className="checkout_subTotal_text">Subtotal ({basket?.length} item{basket?.length > 1 ? "s" : ""}): <CurrencyFormat value={getBasketTotal(basket)} displayType={'text'} thousandSeparator={true} decimalScale={2}  prefix={'$'} renderText={value => <strong>{value}</strong>} /></p>

                            <p className="checkout_gift"><input type="checkbox" name="gift" id="isGift"/> This order contains a gift</p>

                            <button onClick={goToCheckout}>Proceed to checkout</button>
                        </div>
                    </div>
                ) :
                //If there are no items in the basket hide sidebar
                (
                    <div></div>
                )}
                
            </div>
        </div>

    )
}

export default Checkout
