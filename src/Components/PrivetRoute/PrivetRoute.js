import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import firebaseConfig from '../Login/firebase.config';
import * as firebase from "firebase/app";
import "firebase/auth";

const PrivetRoute = ({ children, ...rest }) => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const user = firebase.auth().currentUser;

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivetRoute;