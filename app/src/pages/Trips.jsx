import React, { useEffect, useState } from 'react';
import './../resources/styles/components/Activity.css';
import './../resources/styles/pages/Trips.css';
import NavBar from './../components/NavBar.jsx';
import { getTripsByUserId, getUserById, getImage } from '../firebase'

function dateToString(timestamp) {
  const date = timestamp.toDate();
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleString(undefined, options);
}

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


  return (
    <div className="trips-container">
      <NavBar />
      <div className="trips-content" >
      <h1 className="trips-h1">Trips</h1>
      <h2 className="trips-h2">Invitations</h2>
      <div className="cards-secton">
        {invitedTrips.map((trip, index) => (
          <div className="card" key={index}>
            <div className="card-text">
              <div className="card-title">
                {trip.name}
              </div>
              <div className="card-info">
                <img src={trip.profileImage} className="profile-pic-thumbnail" alt="Profile Thumbnail" />
                <p>{`${trip.organizerDetails.firstName} ${trip.organizerDetails.lastName}`}</p>
                <p>+{trip.invitees.length - 1}</p>
                <p>{dateToString(trip.date)}</p>
                <button className="decline-button">decline</button>
                <button className="accept-button">accept</button>
              </div>
            </div>
          </div>
        ))}
      </div>


      <h2>Accepted</h2>
      {/* create cards for each trip in acceptedTrips here */}
      {acceptedTrips.map((trip, index) => (
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
      ))}

    </div>
      </div>

  );
}

export default Trips;