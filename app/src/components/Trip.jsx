import './../resources/styles/components/Activity.css';
import { useNavigate } from "react-router-dom";


function Trip(tri) {
    const t = tri.tri;

    function dateToString(timestamp) {
        const date = timestamp.toDate();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleString(undefined, options);
    }

    const navigate = useNavigate();

    function viewTrip() {
      console.log("viewTrip for trip with id =" + t.tripId);
      navigate(`/trips/${t.name}`);
    }

    return(
        <div className="card" id={t.tripId} onClick={viewTrip}>
        <div className="card-text">
          <div className="card-title">
            {t.name}
          </div>
          <div className="card-info">
            <p>Organized by {`${t.organizerDetails.firstName} ${t.organizerDetails.lastName}`}</p>
            <p>{dateToString(t.date)}</p>
          </div>
          <div className="trip-buttons-container">
            <button className="decline-button">decline</button>
            <button className="accept-button">accept</button>
          </div>

        </div>
      </div>
    );
}

export default Trip;