import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Log.css';

function Log() {
  const [isLoginMode, setLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formRef = useRef(null);
  const navigate = useNavigate();

  const switchMode = () => {
    setLoginMode(!isLoginMode);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation to check if email and password are not empty
    if (!email || !password) {
      alert('Please fill in both email and password fields.');
      return;
    }

    axios
      .post("http://localhost:3210", {
        email,
        password,
      })
      .then((response) => {
        // Handle the response as needed (e.g., set user authentication token)
        console.log('Login successful', response.data);

        // Clear the entered data after successful login
        setEmail('');
        setPassword('');

        // Clear the form using the ref
        formRef.current.reset();

        // Redirect to the home page after successful login
        navigate('/home');
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic validation to check if email and password are not empty
    if (!email || !password) {
      alert('Valid Email and Password Requires.');
      return;
    }

    axios
      .post("http://localhost:3210", {
        email,
        password,
      })
      .then((response) => {
        // Handle the response as needed (e.g., set user authentication token)
        console.log('Registration successful', response.data);

        // Clear the entered data after successful registration
        setEmail('');
        setPassword('');

        // Clear the form using the ref
        formRef.current.reset();

        // Optionally, you can redirect to the login page after successful registration
        
      })
      .catch((error) => {
        console.error('Registration failed', error);
      });
  };

  return (
    <div>
      <div className="loginbox">
        <img src="https://i.imgur.com/ZYzTdD0.png" className="avatar" />
        <h1>{isLoginMode ? 'Login Here' : 'Register Here'}</h1>
        <form ref={formRef}>
          <p>Email</p>
          <input type="text" name="" placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)} />
          <p>Password</p>
          <input type="password" name="" placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)} />
          {isLoginMode ? (
            <div>
              <input type="submit" name="" value="Login" onClick={handleLogin} />
              <button className='reg-btn' type="button" onClick={switchMode}>Register</button>
            </div>
          ) : (
            <div>
              <input type="submit" name="" value="Register" onClick={handleRegister} />
              <span>Already have an account? </span>
              <button className='login-btn' type="button" onClick={switchMode}>Login</button>
            </div>
          )}
          {isLoginMode && <a href="#">Lost your password?</a>}
        </form>
      </div>
    </div>
  );
}

export default Log;

