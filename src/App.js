import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar';
import { auth,db } from './config';

import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Checkout from './pages/checkout';
import {useStateValue} from './StateProvider';
import Payment from './pages/Payment';
import Orders from './pages/Orders';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51HS956BY787jLVWQpCUCCzKxIfkeAzrro1Y2pWKu3nGBUEEBDgmnXMCrpUtVcoGprij2JYhiNQHYQT9renmliVQ900dMxzNxjT');



function App() {
  const [{user}, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser =>{
      if(authUser){
          //user logged in
        

        db.collection("users").doc(authUser.uid).get()
        .then(doc =>{
          if(doc.exists){


            dispatch({
              type: 'SET_USER',
              userId: doc.data().uid,
              name : doc.data().name,
              basket: doc.data().basket || [],
              orders: doc.data().orders.sort((a, b) => (a.createdAt > b.createdAt)? -1 : 1) || [],
              email: doc.data().email
          });
          
          }
          else{
            dispatch({
              type: 'SET_USER',
              userId: authUser.uid,
              name: '',
              basket: [],
              email: authUser.email,
              orders : []
          });
          }
        }).catch(err =>{
          console.log(err);
        })
      }
      else{
        //user logged out
        dispatch({
          type: 'SET_USER',
          userId: null,
          name: '',
          basket: [],
          email: '',
          orders: []
      })
      }
    })
    return () => {
      unsubscribe();
    }
  }, []);


  return (
    
   <Router>
      
     <Switch>
     <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/checkout">
          <Navbar />
            <Checkout />
          </Route>
          <Route path="/orders">
          <Navbar />
            <Orders />
          </Route>
          <Route path="/payment">
            <Elements stripe={stripePromise}>
            <Navbar />
            <Payment/>
            </Elements>
          </Route>
          <Route path="/">
          <Navbar />
            <Home />
          </Route>
     </Switch>
     
   </Router>
  );
}

export default App;
