"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import './../resources/styles/components/LogInSignUpComponents.css';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

export const LogInPage = (handleCancel, switchToSignUp) =>{
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState("/password-see.svg");

  const handleShow = () => {
    setShow(!show);
    setIcon(show ? "/password-see.svg" : "/password-hide.svg");
  };

  const handleLogin = async () => {
    var validRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(validRegex)) {
      toast.error("Please enter a valid email.");
      return;
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User successfully logged in
            const user = userCredential.user;
            console.log("User logged in:", user);
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Login error:", errorCode, errorMessage);
        });
  };
  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      console.log('User signed in with Google successfully!');
      // Redirect or perform any other action after sign-in
    } catch (error) {
        toast.error("Google sign in erred.");
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    /* Login */
    <div className="LogInComponent">
      <ToastContainer />
      {/* Login Frame */}
      <div className="flex flex-col items-center gap-[20px]">
        {/* Login Content */}
        <div>
          <div className="PageHeader">
            Log In
              <div className="Link">
                <div>
                  Don’t have an account?{" "}
                  <button className="button" onClick={switchToSignup}>
                    Sign Up
                  </button>
                </div>
              </div>
          <div/>
            <div className="AccountInfoInput">
              <div>
                <div>
                  <label >
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
                  <label>
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
                  />
                </div>
              </div>
              <button className="button" onClick={handleLogin}>Sign In with Email/Password</button>
             <button className="button" onClick={handleGoogleSignIn}>Sign In with Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}