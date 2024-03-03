import React, { useRef, useEffect, useState } from 'react';
import './../resources/styles/components/Activity.css';
import { updateTripMembers } from './../firebase'


function Trip({tri, userId, onVariableChange}) {
    const t = tri.tri;

    function dateToString(timestamp) {
        const date = timestamp.toDate();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleString(undefined, options);
    }

  const handleChange = (bool) => {
    if(bool) {
      updateTripMembers(t.id, userId, 'accept');
    } else {
      updateTripMembers(t.id, userId, 'decline');
    }
    onVariableChange(bool); // Notify the parent about the change
  };



    return(
        <div className="card">
        <div className="card-text">
          <div className="card-title">
            {t.name}
          </div>
          <div className="card-info">
            {/* <img src={t.profileImage} className="profile-pic-thumbnail" alt="Profile Thumbnail" /> */}
            <p>Organized by {`${t.organizerDetails.firstName} ${t.organizerDetails.lastName}`}</p>
            {/* <p>+{t.invitees.length - 1}</p> */}
            <p>{dateToString(t.date)}</p>
          </div>
          <div className="trip-buttons-container">
            <button className="decline-button" onClick={handleChange(false)}>decline</button>
            <button className="accept-button" onClick={handleChange(true)}>accept</button>
          </div>

        </div>
      </div>
    );
}

export default Trip;