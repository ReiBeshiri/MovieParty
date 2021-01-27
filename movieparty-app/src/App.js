import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Redirect} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Homepage from "./components/Layout/Homepage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import MovieParty from "./components/MovieParty/MovieParty";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Homepage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/movieparty" component={MovieParty}/>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>          
          <Route path="*" render={() => (<Redirect to="/login" />)}/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
