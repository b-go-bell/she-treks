import './../resources/styles/pages/Home.css';
import { getUsers } from '../firebase'

function Home() {
  getUsers();
  return (
    <div className="Home">
      <header className="Home-header">
        <p>
          home page
        </p>
      </header>
      <div></div>
    </div>
  );
}

export default Home;