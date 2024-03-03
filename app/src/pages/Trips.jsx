import './../resources/styles/pages/Home.css';
import { getUsers } from '../firebase'

function Trips() {
  getUsers();
  return (
    <div className="Trips">
      <header className="Home-header">
        <p>
          trips page
        </p>
      </header>
      <div></div>
    </div>
  );
}

export default Trips;