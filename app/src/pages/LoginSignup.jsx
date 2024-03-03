import React from 'react';
import './../resources/styles/pages/LoginSignup.css';
import {LogInPage} from '../components/LogIn.jsx';
import {SignUpPage} from '../components/SignUp.jsx';
import {useState, useEffect} from 'react';

const LoginSignup = () => {
  const[showLogin, setShowLogin] = useState(false);
  const[showSignup, setShowSignup] = useState(false);

  function showLog() {
    setShowLogin(true); 
  }
  function showSign() {
    setShowSignup(true); 
  }
  function hideLog() {
    setShowLogin(false); 
  }
  function hideSign() {
    setShowSignup(false); 
  }
  function switchSignupToLogin(){
    setShowLogin(false);
    setShowSignup(true);
  }
  function switchLoginToSignup(){
    setShowSignup(false);
    setShowLogin(true);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>SheTreks</h1>
        <p>connect with other women in the outdoors</p>
        <div className="button">
          <button className="login" onClick={showLog}>log in</button>
          <button className="signup" onClick={showSign}>sign up</button>
        </div>
      </header>
      <div className="background-with-gradient"></div>
      <div className="gradient-overlay"></div>
      {showLogin && (
        <div>
            <LogInPage
                handleCancel={hideLog}
                switchToSignUp={switchLoginToSignup}
            />
        </div>
      )}
      {showSignup && (
        <div>
            <SignUpPage
                handleCancel={hideSign}
                switchToLogIn={switchSignupToLogin}
            />
        </div>
      )}
    </div>
  );
}

export default LoginSignup;
