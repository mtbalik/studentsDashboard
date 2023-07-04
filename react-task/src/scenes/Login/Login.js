import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { CssBaseline, ThemeProvider } from "@mui/material";

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
   

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    
  <div className="body" >
      <CssBaseline />
    <div className="auth-form-container">
      <h1 className="head">MANAGE COURSES</h1>
      <h1>SIGN IN</h1>
      <p className="details">Enter your credentials to access your account</p>
      <form className="login-form" onSubmit={handleSubmit}>
      
      <label htmlFor="email">Email</label>
     
      <input type="text" onChange={e => setUserName(e.target.value)} placeholder="Enter your email" id="email" name="email"/>
      
      <label htmlFor="password">Password</label>
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter your password" id="password" name="password"/>

        <div>
          <button className='button-log' type="submit">SIGN IN</button>
        </div>
      </form>
      <p className="txt-down"> Forgot your password? <a href='#' className="link-btn"> Reset Password.</a> </p> 
    </div>
  </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};