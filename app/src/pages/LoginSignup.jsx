import React from 'react';
import './../resources/styles/pages/LoginSignup.css';
import {LogInPage} from '../components/LogIn.jsx';
import {SignUpPage} from '../components/SignUp.jsx';
import {useState} from 'react';

const LoginSignup = () => {
  const[showLogin, setShowLogin] = useState(false);
  const[showSignup, setShowSignup] = useState(false);

  function showLog() {
    console.log("show login");
    setShowLogin(true); 
  }
  function showSign() {
    console.log("show signup");
    setShowSignup(true); 
  }
  function hideLog() {
    console.log("hide login");
    setShowLogin(false); 
  }
  function hideSign() {
    console.log("hide signup");
    setShowSignup(false); 
  }
  function switchSignupToLogin(){
    console.log("switch to login from signup");
    setShowLogin(false);
    setShowSignup(true);
  }
  function switchLoginToSignup(){
    console.log("switch to signup from login");
    setShowSignup(false);
    setShowLogin(true);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>SheTreks</h1>
        <p>connect with other women in the outdoors</p>
      </header>
      <div className="button-container">
        <button className="login" onClick={showLog}>log in</button>
      </div>
      <div className="button-container">
        <button className="signup" onClick={showSign}>sign up</button>
      </div>
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
