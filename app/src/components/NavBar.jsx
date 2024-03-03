import React from 'react';
import { Link } from 'react-router-dom';
import './../resources/styles/components/NavBar.css';

function NavBar() {
  return (
    <header className="navbar">
        <h1 className="site-title">
            <Link to="/">SheTreks</Link>
        </h1>
        <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/trips">Trips</Link></li>
            <li><Link to="/profile">Profile</Link></li>
        </ul>
        </nav>
    </header>
  );
}

export default NavBar;