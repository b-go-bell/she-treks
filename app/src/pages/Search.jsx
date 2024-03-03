import './../resources/styles/pages/Search.css';
import { NavBar } from './../components/NavBar.jsx';
import Map from './../components/Map.jsx';
import { getUsers } from '../firebase'

function Search() {
  getUsers();
  return (
    <div className="search-page">
        {/* <NavBar/> */}
        <div className="inner-search">
            <div className="sidebar">
              hi
            </div>
            <Map />
        </div>
    </div>
  );
}

export default Search;
