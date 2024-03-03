"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import './../resources/styles/components/LogInSignUpComponents.css';
import firebase from 'firebase/compat/app';
import 'firebase/auth';


export const SignUpPage = ({handleCancel, switchToLogin}) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState("/password-see.svg");

  const handleShow = () => {
    setShow(!show);
    setIcon(show ? "/password-see.svg" : "/password-hide.svg");
  };

  const handleSignUp = async () => {
    try {
      // Create user with email and password
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Log sign-up event
      firebase.analytics().logEvent('sign_up', { method: 'email' });

      console.log('User signed up successfully!');
      // You can add additional logic here, such as redirecting the user to another page
    } catch (error) {
      toast.error('Sign up with name, email, and password error');
      console.error('Error signing up:', error);
    }
  };

  const handleSignUpWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      firebase.analytics().logEvent('sign_up', { method: 'google' });
      console.log('User signed up with Google successfully!');
    } catch (error) {
        toast.error('Sign up with google error');
      console.error('Error signing up with Google:', error);
    }
  };

  return (
    /* Login */
    <div className="SignUpComponent">
      <ToastContainer/>
      {/* Login Frame */}
      <div className="flex flex-col items-center gap-[20px]">
        {/* Login Content */}
        <div>
          <div className="PageHeader">
            Sign Up
              <div className="Link">
                <div>
                 Already have an account?{" "}
                  <button className="button" onClick={switchToLogin}>
                    Log In
                  </button>
                </div>
              </div>
          <div/>
            <div className="AccountInfoInput">
              <div>
                <div className="Names">
                    <div>
                    <label className="label">
                        First Name
                    </label>
                    <input
                        className="TextInput"
                        placeholder="Enter your first name"
                        value={email}
                        style={{
                        fontWeight: 400,
                        lineHeight: "normal",
                        paddingLeft: "13.35px",
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    </div>
                    <div>
                    <label className="label">
                        Last Name
                    </label>
                    <input
                        className="TextInput"
                        placeholder="Enter your last name"
                        value={email}
                        style={{
                        fontWeight: 400,
                        lineHeight: "normal",
                        paddingLeft: "13.35px",
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    </div>
                </div>
                {/* <div>
                  <label className="label">
                    Where are you based?
                  </label>
                  <input
                    className="TextInput"
                    placeholder="Enter city and state"
                    value={email}
                    style={{
                      fontWeight: 400,
                      lineHeight: "normal",
                      paddingLeft: "13.35px",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div> */}
                <div>
                  <label className="label">
                    Email
                  </label>
                  <input
                    className="TextInput"
                    placeholder="Enter your email"
                    value={email}
                    style={{
                      fontWeight: 400,
                      lineHeight: "normal",
                      paddingLeft: "13.35px",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>
                    Password
                  </label>
                  <input
                    className="TextInput"
                    placeholder="Enter a password"
                    value={password}
                    style={{
                      fontWeight: 400,
                      lineHeight: "normal",
                      paddingLeft: "13.35px",
                    }}
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
              <button onClick={handleSignUp}>Sign Up</button>
              <button onClick={handleSignUpWithGoogle}>Sign Up with Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}