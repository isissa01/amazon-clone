import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Login.css";
import {useStateValue} from '../StateProvider';

import {auth, db} from '../config';

function Register() {
    const history = useHistory();
    const [{}, dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState(null);

    const register = (event) =>{
        event.preventDefault(); 

        auth.createUserWithEmailAndPassword(email, password)
        .then(creds =>{
            setErrors(null);
            db.doc(`users/${creds.user.uid}`).set({
                name: name,
                uid: creds.user.uid,
                email: creds.user.email,
            })
            dispatch({
                type: 'REGISTER_USER',
                userId: creds.userId,
                name: name,
                email: creds.user.email
            })
            history.push('/');
        }).catch(err =>{
            console.log(err);
            setErrors(err.message);

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
              <h2>Create Account</h2>
              <form  className="login_form">
                <label  className="error">{errors}</label>
                <label htmlFor="name" className="login_label">Your name</label>
                <input type="text" value={name} name="name" onChange={event => setName(event.target.value) } id="name" className="login_email" />
                  <label htmlFor="email" className="login_label">Email</label>
                  <input type="text" value={email} name="email" onChange={event => setEmail(event.target.value) } id="email" className="login_email" placeholder="Email..."/>
                  <label htmlFor="password" className="login_label">Password</label>
                  <input type="password" name="password" value={password} id="password" className="login_password" placeholder="At least 6 characters" onChange={event => setPassword(event.target.value) } />

                  <label htmlFor="confrimPassword" className="login_label">Re-enter password</label>
                  <input type="password" name="confirmPassword" value={confirmPassword} id="confirmPassword" className="login_password" onChange={event => setConfirmPassword(event.target.value) } />

                  <button type="submit" className="login_button" onClick={register}>Continue</button>
              </form>
              <p className="login_agree">By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.

              </p>
          </div>
            <div className="login_create">
                <p className="login_question"><span>Already have an account?</span></p>

                <Link to="/login" className="login_createAccount">Sign-in</Link>
            </div>
          
       </div>
    )
}

export default Register
