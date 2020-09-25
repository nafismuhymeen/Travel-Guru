import React, { useContext } from 'react';

import './SignUp.css'
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config'
import { UserData } from '../../App'


const SignUp = () => {
    const location = useLocation();
    const history = useHistory();
    let { from } = location.state || { from: { pathname: "/" } };
    function handleClickLogin() {
        history.push("/login")
    }
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const [user, setUser] = useContext(UserData);

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {

        firebase.auth().signInWithPopup(googleProvider).then(function (result) {
            const user = result.user;
            history.replace(from);
            alert("Login Done");

            // ...
        }).catch(function (error) {
            // Handle Errors here.
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFacebookSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider).then(function (result) {
            const user = result.user;
            history.replace(from);
            alert("Login Done");
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }
    const handleBlurSignUp = (e) => {
        let fieldVerification;
        if (e.target.name === "name") {
            let newUser = { ...user };
            newUser.name = e.target.value;
            setUser(newUser);
        }
        if (e.target.name === "email") {
            fieldVerification = /\S+@\S+\.\S+/.test(e.target.value);

        }

        if (e.target.name === "password") {
            fieldVerification = e.target.value.length > 7;

        }
        if (fieldVerification) {
            let newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
            console.log(user);

        }




    }
    const handleSignup = (e) => {

        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res=>{
            handleUserName(user.name);
            history.replace(from);
            alert("Signup Done");
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
        e.preventDefault();
    }
    const handleUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }
    
    return (
        <div className="signUp">
            <div className="signUp__emptyTop"></div>
            <div className="signUp__form">
                <h2>Create Account</h2>
                <div className="signUp__inputs">
                    <form autoComplete="off">
                        <input onBlur={handleBlurSignUp} style={{ width: "461px", marginTop: "10px" }} name="name" placeholder="Your Full Name" required /><br />
                        <input onBlur={handleBlurSignUp} style={{ width: "461px", marginTop: "10px" }} name="email" placeholder="Valid Email" required /><br />
                        <input onBlur={handleBlurSignUp} style={{ width: "461px", marginTop: "10px" }} name="password" placeholder="Password Atleast 8 character Long" required /><br />
                        <div className="signUp__btn">
                            <button onClick={handleSignup} type='submit'>Create An Account</button>
                        </div>
                    </form>
                </div>

                <p className="signUp__alreadyHaveAccount">Already have an account?<span onClick={handleClickLogin} className="signUp__login">Login</span></p>
            </div>
            <div onClick={handleFacebookSignIn} className="signUp__facebook"><p>Continue with Facebook</p></div>
            <div onClick={handleGoogleSignIn} className="signUp__google"><p>Continue with Google</p></div>
            <div className="signUp__emptyBottom"></div>
        </div>
    );
};

export default SignUp;