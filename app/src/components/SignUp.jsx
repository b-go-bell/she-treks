"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import './../resources/styles/components/LogInSignUpComponents.css';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../firebase'
// import 'firebase/firestore';
// import 'firebase/analytics';
// import 'firebase/auth';


export const SignUpPage = ({handleCancel, switchToLogin}) => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState("./../resources/media/password-see.svg");

  const handleShow = () => {
    setShow(!show);
    setIcon(show ? "./../resources/media/password-see.svg" : "./../resources/media/password-hide.svg");
  };

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name] : e.target.value,
    })
  }

  function handleSignUp() {
    nav('/search');
  }

  // const handleSignUp = async () => {
  //   try {
  //     var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     if (!form.email.match(validRegex)) {
  //       toast.error("Please enter a valid email.");
  //       return;
  //     }
  //     // Create user with email and password
  //     console.log("attempt to add user: ", form.email);
  //     const response = createUser(form.email, form.password, form.firstName, form.lastName);
  //   console.log('User added to Firestore successfully!', reponse);
  //   nav('/profile');

  //   } catch (error) {
  //     toast.error('Sign up with name, email, and password error');
  //     console.error('Error signing up:', error);
  //   }
  // };

//   const handleSignUpWithGoogle = async () => {
//     try {
//       const provider = new firebase.auth.GoogleAuthProvider();
//       await firebase.auth().signInWithPopup(provider);
//       firebase.analytics().logEvent('sign_up', { method: 'google' });
//       console.log('User signed up with Google successfully!');
//     } catch (error) {
//         toast.error('Sign up with google error');
//       console.error('Error signing up with Google:', error);
//     }
//   };

  return (
    /* Login */
    <div className="BUG">
      Coming Soon :)
      <button className="btn" onClick={handleSignUp}>Start exploring</button>
    </div>

      // <div className="LogSignContainer">
      //   {/* Login Content */}
      //   <div>
      //     <div className="PageHeader">
      //       Coming soon :)
      //     </div>
      //     <div className="btn" onClick={handleSignUp()}>Start exploring</div>
      //         {/* <div className="Link">
      //           <div className="PageSubHeader">
      //            Already have an account?{" "}
      //             <div className="buttonDiscrete" onClick={switchToLogin}>
      //               Log In
      //             </div>
      //           </div>
      //         </div>
      //         <button className="x" onClick={handleCancel}>
      //           X
      //       </button>
      //      <div/>
      //       <div className="AccountInfoInput">
      //         <div>
      //           <div className="Names">
      //               <div>
      //               <div className="label">
      //                   First Name
      //               </div>
      //               <input
      //                   className="TextInput"
      //                   placeholder="Enter your first name"
      //                   name={'firstName'}
      //                   onChange={handleChange}
      //               ></input>
      //               </div>
      //               <div>
      //               <div className="label">
      //                   Last Name
      //               </div>
      //               <input
      //                   className="TextInput"
      //                   placeholder="Enter your last name"
      //                   name={'lastName'}
      //                   onChange={handleChange}
      //               ></input>
      //               </div>
      //           </div>
      //           <div className="input-group">
      //             <div className="label">
      //               Email
      //             </div>
      //             <input
      //               className="TextInput"
      //               placeholder="Enter your email"
      //               name={'email'}
      //               onChange={handleChange}
      //             ></input>
      //           </div>
      //           <div className="input-group">
      //             <div className="label">
      //               Password
      //             </div>
      //             <input
      //               className="TextInput"
      //               placeholder="Enter a password"
      //               type={show ? "text" : "password"}
      //               name={'password'}
      //               onChange={handleChange}
      //             ></input>

      //           </div>
      //         </div>
      //         <div className="btn" onClick={handleSignUp}>register</div>
      //        {/* <div className="btn" onClick={handleSignUpWithGoogle}>register through Google</div>
      //       </div> */}
      //   </div>
      // </div>
  );
}