import React from 'react';
import ReactDOM from 'react-dom/client';
import './resources/styles/index.css';
import Home from './pages/home.jsx';
import Profile from './pages/Profile.jsx';
import Search from './pages/Search.jsx';
import LoginSignup from './pages/LoginSignup.jsx';
import Trips from './pages/Trips.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
