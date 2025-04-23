import React, { Fragment, useEffect} from 'react';
import './App.css';
import { Navbar } from './layout/Navbar/Navbar';
import { Routes } from './Routing/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Landing } from './layout/landing/Landing';
//Redux
import { Provider } from 'react-redux';
import store from './store';


function App() {
  // const [user, setUser] = useState('This is a parent component');
  return (
    <Provider store={store}>
      <Router>
          <>
            {/* <UserContext.Provider value={user}> */}
            <Navbar />
            <Switch>
              <Route exact path = '/' component = {Landing}/>
              <Route component = {Routes}/>
            </Switch>
            {/* </UserContext.Provider> */}
          </>
      </Router>
    </Provider>
  );
}

export default App;
