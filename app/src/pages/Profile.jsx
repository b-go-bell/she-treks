import './../resources/styles/pages/App.css';
import { getUsers } from '../firebase'

function App() {
    getUsers();
    return (
        <div className="App">
        <header className="App-header">
            <p>
            Profile Page
            </p>
        </header>
        </div>
    );
    }

    export default App;