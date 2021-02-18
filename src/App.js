import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import CreatePollPage from './components/CreatePollPage/CreatePollPage';
import Navbar from './components/Navbar/Navbar';
import PollPage from './components/PollPage/PollPage';
import PollResultsPage from './components/PollResultsPage/PollResultsPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/poll/:id"><PollPage /></Route>
          <Route exact path="/results/:id"><PollResultsPage /></Route>
          <Route exact path="/"><CreatePollPage /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
