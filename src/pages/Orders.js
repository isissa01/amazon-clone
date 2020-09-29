import React from 'react'
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import './Orders.css';
import FlipMove from 'react-flip-move';

import OrderItem from '../components/OrderItem';
import { useHistory } from 'react-router-dom';


function Orders() {
    const [{orders,userId, name}, ] = useStateValue();
    const history = useHistory();
    if(!userId) history.push('/login');
    return (
       <div className="orders">
           <div className="orders_header">
               <h1>Your Orders</h1>
           </div>
           {orders.map(order =>(
               <div className="order_section">
               <div className="order_row">
                   <div className="order_date">
                       <p>Order Placed</p>
                        <p>{order.createdAt}</p>
                   </div>
                   <div className="order_total">
                       <p>TOTAL</p>
                        <p><CurrencyFormat value={getBasketTotal(order.items)} displayType={'text'} thousandSeparator={true} decimalScale={2}  prefix={'$'} renderText={value => <span>{value}</span>} /></p>
                   </div>
                   <div className="order_shipTo">
                       <p>Ship To</p>
                        <p>{name}</p>
                   </div>
                   <div className="order_number">
           <p>Order# {order.orderId}</p>
                   </div>


               </div>
               <div className="order_items">
               <FlipMove>
                            {order.items.map(item =>(
                                <OrderItem item={item} key={item.id}/>
                    ))}
                    </FlipMove>

               </div>

               <div className="order_archive">
                   <button>Archive Order</button>
               </div>


           </div>


           ))}
            
           
       </div>
    )
}

export default Orders
