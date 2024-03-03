import React, { useEffect, useState } from 'react';
import './../resources/styles/components/Activity.css';
import './../resources/styles/pages/Trips.css';
import NavBar from './../components/NavBar.jsx';
import Trip from './../components/Trip.jsx';
import { getTripsByUserId, getUserById, getImage } from '../firebase'


function TripPage() {
  const userId = "zrFxCjWEybZoFiNGCOBYQBWDLri1";


  return (
    <div className="trips-container">
      <NavBar />
      <div className="trips-content" >
      <h1 className="trips-h1">Trip</h1>
      <h2 className="trips-h2"></h2>
      <div className="cards-section">

      </div>

      <h2 className="trips-h2">Upcoming Trips</h2>
      <div className="cards-section">
      </div>


    </div>
      </div>

  );
}

export default TripPage;