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
  }, []);

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
          <Trip tri={t}/>
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
          <Trip tri={t}/>
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
      {/* create cards for each trip in acceptedTrips here */}
      {/* {acceptedTrips.map((trip, index) => (
        <div className="card" key={index}>
          <div />
          <div className="card-text">
            <div className="card-title">
              {trip.name}
            </div>
            <div className="card-info">
              <img src={trip.profileImage} className="profile-pic-thumbnail" alt="Profile Thumbnail" />
              <p>{`${trip.organizerDetails.firstName} ${trip.organizerDetails.lastName}`}</p>
              <p>{dateToString(trip.date)}</p>
            </div>
          </div>
        </div>
      ))} */}

    </div>
      </div>

  );
}

export default Trips;