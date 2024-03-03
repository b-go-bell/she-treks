"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import './../resources/styles/components/LogInSignUpComponents.css';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';
import 'firebase/auth';


export const SignUpPage = ({handleCancel, switchToLogin}) => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState("/password-see.svg");

  const handleShow = () => {
    setShow(!show);
    setIcon(show ? "/password-see.svg" : "/password-hide.svg");
  };

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name] : e.target.value,
    })
  }

  const handleSignUp = async () => {
    try {
    //   var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   if (!email.match(validRegex)) {
    //     toast.error("Please enter a valid email.");
    //     return;
    //   }
      // Create user with email and password
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(form.email, form.password);
      const userId = userCredential.user.uid;
      // Log sign-up event
      firebase.analytics().logEvent('sign_up', { method: 'email' });

      console.log('User signed up successfully!');

      const usersCollection = firebase.firestore().collection('users');
    await usersCollection.doc(userId).set({
      email: form.email,
      firstName : form.firstName,
      lastName : form.lastName,
    });

    console.log('User added to Firestore successfully!');
    nav.push('/profile');

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
              <button className="x" onClick={handleCancel}/>
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
                        style={{
                        fontWeight: 400,
                        lineHeight: "normal",
                        paddingLeft: "13.35px",
                        }}
                        name={form.firstName}
                        onChange={handleChange}
                    ></input>
                    </div>
                    <div>
                    <label className="label">
                        Last Name
                    </label>
                    <input
                        className="TextInput"
                        placeholder="Enter your last name"
                        style={{
                        fontWeight: 400,
                        lineHeight: "normal",
                        paddingLeft: "13.35px",
                        }}
                        name={form.lastName}
                        onChange={handleChange}
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
                    style={{
                      fontWeight: 400,
                      lineHeight: "normal",
                      paddingLeft: "13.35px",
                    }}
                    name={form.email}
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label>
                    Password
                  </label>
                  <input
                    className="TextInput"
                    placeholder="Enter a password"
                    type={show ? "text" : "password"}
                    name={form.password}
                    onChange={handleChange}
                  ></input>
                  <img
                    className="transform scale-[40%] absolute left-[495px] top-[6px]"
                    src={icon}
                    onClick={handleShow}
                    alt="see"
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