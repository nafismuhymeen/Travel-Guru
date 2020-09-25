import React, { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import fakeData from './fakeData'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './Components/Login/Login';
import Booking from './Components/Booking/Booking';
import SignUp from './Components/SignUp/SignUp';
import Hotels from './Components/Hotels/Hotels';
import PrivetRoute from './Components/PrivetRoute/PrivetRoute';


export const UserData = createContext();

function App() {
  const [places, setPlaces] = useState(fakeData);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  // console.log(user);
  return (

    <UserData.Provider value={[user, setUser]}>
      <Router>
      <NavBar></NavBar>
      <Switch>
        <Route path="/booking/:destinationId">
          <Booking place={places}></Booking>
        </Route>
        <Route path="/login">
         <Login></Login>
        </Route>
        <Route path="/signup">
         <SignUp></SignUp>
        </Route>
        <PrivetRoute path="/hotels/:place">
         <Hotels></Hotels>
        </PrivetRoute>
        <Route exact path="/">
         <Home places={places}></Home>
        </Route>
      </Switch>
    </Router>
    </UserData.Provider>

  );
}

export default App;
