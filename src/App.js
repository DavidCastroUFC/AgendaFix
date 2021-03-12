import './App.css';

import Home from './pages/landingpage/index';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" children={Home}/>
          <Route path="/dashboard" children={''}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
