import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import {useStateValue} from "../StateProvider";
import "./Product.css";
import CurrencyFormat from 'react-currency-format';

const useStyles = makeStyles({
    root: {
     width:'100%',
     margin: 'auto'
    },
    media: {
      height: 140,
    },
  });

 
function Product({id,title,price, image, rating, className}) {
  const [, dispatch] = useStateValue();

    const classes = useStyles();

    const addToBasket = () => {
      //add item to basket
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id,
          title,
          image,
          price,
          rating
        }
      });
    }
  
    return (
        <div className={['product', className].join(' ')}>
          <div className="product_info">
            <p>{title}</p>
            <p className="product_price">
              <small>$</small>
              <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} decimalScale={2} renderText={value => <strong>{value}</strong>} />

            </p>
            <div className="product_rating">
              {Array(rating).fill(" ").map( e =>(
                <StarIcon/>
              ))}
            </div>

          </div>

          <img src={image} alt="product image"/>
          <button onClick={addToBasket}>Add to basket</button>
        </div>
    )
}

export default Product
