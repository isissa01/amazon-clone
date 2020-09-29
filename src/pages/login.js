import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./Login.css";
import {useStateValue} from '../StateProvider';

import {auth} from '../config';

function Login() {
    const history = useHistory();
    const [{userId}, dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if(userId){
        
        history.push('/');
    }
    const validateEmail = em =>{
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(em)) return true;
        else return false;
    }
    const loginIn = (event) =>{
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(creds =>{  
            
            history.push('/');
            
        }).catch(err =>{
            console.log(err);
        })
        


    }
    
    return (
       <div className="login">
           <div className="login_logo">
            <Link to="/" >
              <img className="logo_image" src="https://www.pinclipart.com/picdir/big/203-2039717_amazon-vow-of-practicality-amazon-png-clipart.png" alt="logo"></img>
            </Link>
          </div>
          <div className="login_main">
              <h2>Sign-In</h2>
              <form  className="login_form">
                  <label htmlFor="email" className="login_label">Email (phone for mobile accounts)</label>
                  <input type="text" value={email} name="email" onChange={event => setEmail(event.target.value) } id="email" className="login_email" placeholder="Email..."/>
                  <label htmlFor="password" className="login_label">Password</label>
                  <input type="password" name="password" value={password} id="password" className="login_password" placeholder="Password..." onChange={event => setPassword(event.target.value) } />
                  <button type="submit" className="login_button" onClick={loginIn}>Continue</button>
              </form>
              <p className="login_agree">By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.

              </p>
          </div>
            <div className="login_create">
                <p className="login_question"><span>New to Amazon?</span></p>

                <Link to="/register" className="login_createAccount">Create your Amazon account</Link>
            </div>
          
       </div>
    )
}

export default Login