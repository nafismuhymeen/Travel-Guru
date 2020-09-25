import React, { useContext } from 'react';
import './Login.css'
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { UserData } from '../../App'



const Login = () => {
    const [user,setUser] = useContext(UserData);
        
    const location = useLocation();
    const history = useHistory();
    function handleClickCreateAccount() {
        history.push("/signup")
    }
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    
    
    let { from } = location.state || { from: { pathname: "/" } };
    // Login By Google
    const googleprovider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {

        firebase.auth().signInWithPopup(googleprovider).then(function (result) {
            const user = result.user;
            alert("Login Done");
            history.replace(from);

            // ...
        }).catch(function (error) {
            // Handle Errors here.
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }

    // Login By Facebook
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    const handleFacebookSignIn = () => {
        firebase.auth().signInWithPopup(fbprovider).then(function (result) {
            const user = result.user;
            alert("Login Done");
            history.replace(from);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }
    // Login By Email
    const handleBlur = (e)=>{
        let fieldVerification = true;
        if (e.target.name === "email") {
            fieldVerification = /\S+@\S+\.\S+/.test(e.target.value);
            
        }
        if (e.target.name === "password") {
            fieldVerification = e.target.value.length > 7;
            
        }
        if (fieldVerification) {
            let newUser = {...user};
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
            
        }}

       
    
    // console.log(user.email);
        const handleLogIn = (e)=>{
            e.preventDefault();
            firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((result)=>{
                alert("Login Done");
                history.replace(from);
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorMessage = error.message;
                alert(errorMessage);
              });
              e.preventDefault();
        }
        
    return (
        <div className="login">
            <div className="empty"></div>
            <div className="login__form">
                <h2>Login</h2>
                <div className="login__inputs">
                    <form  autoComplete="off">
                        <input style={{width:"461px", marginTop:"10px"}} required onBlur={handleBlur} name="email"  placeholder="Valid Email" /><br />
                        <input style={{width:"461px", marginTop:"10px"}} required onBlur={handleBlur} name="password"  placeholder="Password Atleast 8 character Long" />
                        <div className="login__btn">
                            <button onClick={handleLogIn} type="submit">Login</button>
                        </div>
                    </form>
                </div>
                <div className="login__rememberMe__forgotPassword">
                    <div className="login__rememberMe">
                        <input type="checkbox" id="rememberMe" name="rememberMe"></input>
                        <label style={{ paddingLeft: "9.6px" }} htmlFor="rememberMe"> Remember Me</label>
                    </div>
                    <p className="login__forgotPassword">Forgot Password</p>
                </div>
                <p className="login__dontHaveAccount">Don't have an account?<span onClick={handleClickCreateAccount} className="login__createAccount">Create an account</span></p>

            </div>
            <div onClick={handleFacebookSignIn} className="login__facebook"><p>Continue with Facebook</p></div>
            <div onClick={handleGoogleSignIn} className="login__google"><p>Continue with Google</p></div>
            <div className="empty2"></div>
        </div>
    );
};

export default Login;