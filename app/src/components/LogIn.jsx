"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";


export default function LoginPage() {
  const [localUser, setLocal] = useState<UserInfoType | null>(null);
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

  return (
    /* Login */
    <div className="LogInComponent">
      <ToastContainer />
      {/* Login Frame */}
      <div className="flex flex-col items-center gap-[20px]">
        {/* Image Section */}
        <Image
          src="/logo-color.svg"
          width={120}
          height={80}
          alt="logo"
          className="mt-[0px] w-[173px] h-[79px]"
        />
        {/* Login Content */}
        <div>
          <div className="PageHeader">
            Log In
              <div className="Link">
                <div>
                  Don’t have an account?{" "}
                  <a
                    href="/signup"
                    className="underline"
                  >
                    Create an account
                  </a>
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
                    placeholder="Enter your password"
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
              <button
                id="#login-button"
                onClick={handleLogin}
              >
                <span>
                  Log In
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}