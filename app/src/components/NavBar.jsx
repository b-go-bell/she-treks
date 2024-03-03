import React from 'react';
import { Link } from 'react-router-dom';
import './../resources/styles/components/NavBar.css';

function NavBar() {
  return (
    <div className="navbar">
        <div>
            <Link to="/" className="site-title">SheTreks</Link>
        </div>
        <div>
          <Link to="/" className="site-nav">Home</Link>
          <Link to="/search" className="site-nav">Search</Link>
          <Link to="/trips" className="site-nav">Trips</Link>
          <Link to="/profile" className="site-nav">Profile</Link>
        </div>
    </div>
  );
}

export default NavBar;