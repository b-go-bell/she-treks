import './../resources/styles/pages/Home.css';
import { getUsers } from '../firebase'

function Home() {
  getUsers();
  return (
    <div className="Home">
      <header className="Home-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div></div>
    </div>
  );
}

export default Home;
