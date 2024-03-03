"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import './../resources/styles/components/LogInSignUpComponents.css';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../firebase'

export const LogInPage = ({handleCancel, switchToSignUp}) =>{
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState("./../resources/media/password-see.svg");

  const handleShow = () => {
    setShow(!show);
    setIcon(show ? "./../resources/media/password-see.svg" : "./../resources/media/password-hide.svg");
  };

  const handleLogin = async () => {
    var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(validRegex)) {
      toast.error("Please enter a valid email.");
      return;
    }
    const response = authUser(email, password);
    nav('/home');
  };

//   const handleGoogleSignIn = async () => {
//     try {
//       const provider = new firebase.auth.GoogleAuthProvider();
//       await firebase.auth().signInWithPopup(provider);
//       console.log('User signed in with Google successfully!');
//       // Redirect or perform any other action after sign-in
//     } catch (error) {
//         toast.error("Google sign in erred.");
//       console.error('Error signing in with Google:', error);
//     }
//   };

  return (
    /* Login */
    <>
    <div className="header">
            <div className="siteTitle">SheTreks</div>
    </div>
    <div className="LogSignComponent">
      <ToastContainer 
        closeOnClick
        pauseOnHover
      />
      {/* Login Frame */}
      <div>
        {/* Login Content */}
        <div className="LogSignContainer">
          <div className="PageHeader">
            Log In
                <div className="PageSubHeader">
                  Don’t have an account?{" "}
                  <div className="buttonDiscrete" onClick={switchToSignUp}>
                    Sign Up
                  </div>
                </div>
            <button className="x" onClick={handleCancel}>X</button>
          <div/>
            <div className="AccountInfoInput">
              <div>
                <div>
                  <label className="label">
                    Email
                  </label>
                  <input
                    className="TextInput"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label className="label">
                    Password
                  </label>
                  <input
                    className="TextInput"
                    placeholder="Enter your password"
                    value={password}
                    type={show ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <img
                    className="transform scale-[40%] absolute left-[495px] top-[6px]"
                    src={icon}
                    onClick={handleShow}
                    alt="see"
                  />
                </div>
              </div>
              <div className="btn" onClick={handleLogin}>sign in</div>
             {/* <div className="btn" onClick={handleGoogleSignIn}>sign in with Google</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}