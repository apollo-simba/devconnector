import React, { Fragment} from 'react';
import './App.css';
import { Navbar } from './layout/Navbar/Navbar';
import { Routes } from './Routing/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Landing } from './layout/landing/Landing';
import { Provider } from 'react-redux';
import store from './store';


function App() {
  // const [user, setUser] = useState('This is a parent component');

  return (
  
      <Router>
          <Fragment>
            {/* <UserContext.Provider value={user}> */}
            <Navbar />
            <Switch>
              <Route exact path = '/' component = {Landing}/>
              <Route component = {Routes}/>
            </Switch>
            {/* </UserContext.Provider> */}
          </Fragment>
      </Router>

  );
}

export default App;
