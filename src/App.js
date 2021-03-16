import './App.css';
import React from 'react'
import Home from './pages/landingpage/index';
import Adm from './pages/administracao/index';
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
<<<<<<< Updated upstream
          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="/administracao">
            <Adm/>
          </Route>
=======
          <Route exact path="/" children={Home}/>
          <Route path="/administracao" children={Adm}/>
>>>>>>> Stashed changes
        </Switch>
      </Router>
    </div>
  );
}

export default App;
