import './../resources/styles/pages/Search.css';
import React, { useRef, useEffect, useState } from 'react';
import NavBar from './../components/NavBar.jsx'
import Activity from './../components/Activity.jsx';
import Map from './../components/Map.jsx';
import { getUsers } from '../firebase'

function Search() {
  const [trails, setTrails] = useState([]);

  const handleChildVariableChange = (newTrails) => {
    setTrails(newTrails);
  };

  function getActivities() {
    if(trails.length === 0) {
      return(
        <div className="no-activities">
          NO ITEMS!
        </div>
      );
    } else {
      let acts = [];

      trails.map((t) => (
        acts.push(
        <div className="act-container">
          <Activity act={t}/>
        </div>
      )));

      return(
        <div className="activities">
          {acts}
        </div>
      );
    }
  }

  return (
    <div className="search-page">
        <NavBar/>
        <div className="inner-search">
            {getActivities()}
            <Map updateTrailList={handleChildVariableChange}/>
        </div>
    </div>
  );
}

export default Search;
