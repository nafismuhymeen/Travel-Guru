import React from 'react';
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config'
import logo from './Logo.png';
import './NavBar.css';

const NavBar = () => {

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }


    const history = useHistory();
    function handleClickHome() {
        history.push("/");
    }

    function handleClickLogin() {
        history.push("/login");
    }
    const matchedLogin = useRouteMatch("/login");
    const matchedSignUp = useRouteMatch("/signup");
    const matchedhotels = useRouteMatch("/hotels/:place");
    let loginOrName;
    const handleSignout = ()=>{
        firebase.auth().signOut().then(function() {
            loginOrName = <button onClick={handleClickLogin} className="btn btn-warning">Login</button>;
            alert("Sign-out successful.");

          }).catch(function(error) {
            alert("An error happened.");
          });
    }
    const user = firebase.auth().currentUser;
        if (user != null) {
            loginOrName = <p onClick={handleSignout}>{user.displayName}</p>;
        } else {
            loginOrName = <button onClick={handleClickLogin} className="btn btn-warning">Login</button>;
        }




    return (
        <div className="navBar d-flex">
            <img onClick={handleClickHome} className={matchedLogin || matchedSignUp || matchedhotels ? "navBar__logoBlack" : "navBar__logoWhite"} src={logo} alt="" />
            <div className="searchBar">
                <input className={matchedLogin || matchedSignUp || matchedhotels ? "navBar__searchBarBlack" : "navBar__searchBarWhite"} type="text" placeholder="Search Your Destination..." />
                <FontAwesomeIcon className={matchedLogin || matchedSignUp || matchedhotels ? "searchIconBlack" : "searchIconWhite"} icon={faSearch} />
            </div>
            <p className={matchedLogin || matchedSignUp || matchedhotels ? "navBar__menuBlack" : "navBar__menuWhite"}>News</p>
            <p onClick={handleClickHome} className={matchedLogin || matchedSignUp || matchedhotels ? "navBar__menuBlack" : "navBar__menuWhite"}>Destination</p>
            <p className={matchedLogin || matchedSignUp || matchedhotels ? "navBar__menuBlack" : "navBar__menuWhite"}>Blog</p>
            <p className={matchedLogin || matchedSignUp || matchedhotels ? "navBar__menuBlack" : "navBar__menuWhite"}>Contact</p>
            {loginOrName}
        </div>
    );
};
export default NavBar;