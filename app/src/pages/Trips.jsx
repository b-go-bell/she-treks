import React, { useEffect, useState } from 'react';
import './../resources/styles/components/Activity.css';
import './../resources/styles/pages/Trips.css';
import NavBar from './../components/NavBar.jsx';
import Trip from './../components/Trip.jsx';
import { getTripsByUserId, getUserById, getImage } from '../firebase'


function Trips() {
  const userId = "Wv4ozXlaxEVRrgPYUvQ65YJAhyl1";

  const [invitedTrips, setInvitedTrips] = useState([]);
  const [acceptedTrips, setAcceptedTrips] = useState([]);

  const [tripChange, setTripChange] = useState(false);

  // Function to update childVariable
  const handleTripChange = (newVar) => {
    setTripChange(newVar);
  };

  useEffect(() => {
    const fetchUserData = async () => {
        try {
          const invited = await getTripsByUserId("invitees", userId);
          const accepted = await getTripsByUserId("accepted", userId);

          const invitedPromises = invited.map(async (trip) => {
            const organizerDetails = await getUserById(trip.organizer);
            const profileImage = await getImage("profile", trip.organizer);

            return {
              ...trip,
              organizerDetails,
              profileImage,
            };
          });

          const acceptedPromises = accepted.map(async (trip) => {
            const organizerDetails = await getUserById(trip.organizer);
            const profileImage = await getImage("profile", trip.organizer);

            return {
              ...trip,
              organizerDetails,
              profileImage,
            };
          });

          const invitedTripsWithData = await Promise.all(invitedPromises);
          const acceptedTripsWithData = await Promise.all(acceptedPromises);

          setInvitedTrips(invitedTripsWithData);
          setAcceptedTrips(acceptedTripsWithData);

        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };
    fetchUserData();
  }, [tripChange]);

  function getInvited() {
    let invites = [];

    if(invitedTrips.length === 0) {
      invites.push(
        <div>
          NO INVITED TRIPS
        </div>
      );
    } else {
      invitedTrips.map((t) => (
        invites.push(
        <div className="trips-list">
          <Trip tri={t} u={userId} onVariableChange={handleTripChange}/>
        </div>
      )));
    }
    return invites;
  }

  function getAccepted() {
    let accepts = [];

    if(acceptedTrips.length === 0) {
      accepts.push(
        <div>
          NO UPCOMING TRIPS
        </div>
      );
    } else {
      acceptedTrips.map((t) => (
        accepts.push(
        <div className="trips-list">
          <Trip tri={t} u={userId} varChange={handleTripChange}/>
        </div>
      )));
    }
    return accepts;
  }

  return (
    <div className="trips-container">
      <NavBar />
      <div className="trips-content" >
      <h1 className="trips-h1">Trips</h1>
      <h2 className="trips-h2">Trip Invitations</h2>
      <div className="cards-section">
        {getInvited()}
      </div>

      <h2 className="trips-h2">Upcoming Trips</h2>
      <div className="cards-section">
        {getAccepted()}
      </div>

    </div>
    </div>

  );
}

export default Trips;