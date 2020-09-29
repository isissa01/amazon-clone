import React, {forwardRef} from 'react';
import StarIcon from '@material-ui/icons/Star';
import {useStateValue} from '../StateProvider';
import CurrencyFormat from 'react-currency-format';
const  Item = forwardRef(({item}, ref) => {
    const [{}, dispatch] = useStateValue();
    const removeFromBasket = () =>{
        dispatch({
            type: "REMOVE_FROM_BASKET",
            item: item
        })
    }
    return (
        <div ref={ref} className="checkout_item" >
            <img 
            src = {item.image}
            alt=""
            className="checkout_itemImage" />

            <div className="checkout_itemDetails">

                <p className="checkout_itemTitle">{item.title}</p>
                <div className="product_rating">
                    {Array(item.rating).fill(" ").map( e =>(
                        <StarIcon/>
                    ))}
                </div>

                <button onClick={removeFromBasket}>Remove from basket</button> 

                
            </div>
            <p className="checkout_itemPrice">$<CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true}  renderText={value => <strong>{value}</strong>} /></p>
            
        </div>
    )
});

export default Item
