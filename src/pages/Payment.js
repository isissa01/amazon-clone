import React, { useEffect, useState } from 'react'

import Item from '../components/Item';
import {useStateValue} from '../StateProvider';
import './Payment.css';
import FlipMove from 'react-flip-move';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {db} from '../config';
import firebase from 'firebase';


import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import axios from '../axios';
import { useHistory } from 'react-router-dom';



function Payment() {
    const [{basket, userId, name}, dispatch ] = useStateValue();
    const history = useHistory();
    if(!userId) history.push('/login');

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        //used tp charge client the right amount
        const getClientSecret = async () =>{
            const response = await axios({
                //stripe expects the total in a currencies in subunites meaning in cents so multiply by 100
                method: 'post',
                url: `/payments/create?total=${(getBasketTotal(basket) * 100).toFixed(0)}` // make sure there is no trailing decimal points
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();

    }, [basket]);

    // console.log("THE SECRET IS >>>", clientSecret);

  const handleSubmit = async event => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
      
    }


    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
      
    }).then(({paymentIntent}) =>{
        //paymentIntent = payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        console.log("Payment intent >>>",paymentIntent);
        // let data = {}
        //  data[paymentIntent.id] = {items: basket,
        //     createdAt: new Date().toDateString()};

        db.doc(`users/${userId}`).update({
            basket: [],
            orders: firebase.firestore.FieldValue.arrayUnion(
                {
                    orderId: paymentIntent.id,
                    items: basket,
                    createdAt: new Date().toString().split('GMT')[0]
                }
            )
            // items: basket,
            // createdAt: new Date().toDateString()
            
        }).then( () =>{

            db.collection('users').doc(userId).get().then(snapshot =>{

                dispatch({
                    type: "EMPTY_BASKET",
                    orders: snapshot.data().orders.sort((a, b) => (a.createdAt > b.createdAt)? -1 : 1)
                })
                console.log(snapshot.data().orders.sort((a, b) => (a.orderId > b.orderId)? -1 : 1));
                
            }).catch (err =>{

            });

        }).catch(err =>{
            console.log(err); 

            
        });

        

        
        history.replace('/orders');


        

    });

    // console.log("[PaymentMethod]", payload);
    // setProcessing(false);
    // setSucceeded(true)
  };

  const handdleChange = event =>{
      setDisabled(event.empty);
      setError(event.error? event.error.message : "");
  }

    return (
        <div className="payment">
            <div className="payment_header">
            <h2>Checkout ({basket?.length} item{basket?.length > 1 || basket?.length === 0 ? "s" : ""})</h2>
            </div>
            
            <div className="payment_row">
                <div className="payment_rowTitle">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment_rowMain">
                        <div className="payment_address">
                            <p className="payment_addressName">
                                {name}
                            </p>
                            <p className="payment_addressStreet">
                                123 React Lane
                            </p>
                            <p className="payment_addressCity">
                                Los Angeles, CA
                            </p>
                        </div>
                </div>
            </div>

            <div className="payment_row">
                <div className="payment_rowTitle">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment_rowMain">
                <FlipMove>
                            {basket.map(item =>(
                                <Item item={item} key={item.id}/>
                    ))}
                    </FlipMove>
                </div>
            </div>

            <div className="payment_row">
                <div className="payment_rowTitle">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment_rowMain">
                    <div className="card_info">
                        <h4 className="card_infoTitle">
                            Card Details
                        </h4>
                        <div className="card_infoDetails">

                            

                            <form >
                                    <CardElement
                                    // options={options}
                                    onReady={() => {
                                       
                                    }}
                                    onChange={handdleChange
                                    }
                                    onBlur={() => {
                             
                                    }}
                                    onFocus={() => {
                             
                                    }}
                                    />
                                    <label className="error">{error}</label>

                                </form>

                        </div>
   

                    </div>
                    <div className="buy_section">
                        <h4 className="order_toto">
                        Order Total: <CurrencyFormat value={getBasketTotal(basket)} displayType={'text'} thousandSeparator={true} decimalScale={2}  prefix={'$'} renderText={value => <span>{value}</span>} />
                        </h4>
                                <button  disabled={processing ||disabled || succeeded} onClick={handleSubmit}>{processing? "Processing" : "Buy Now" }</button>
                    </div>
                    

  
                </div>
            </div>
        </div>
    )
}

export default Payment
