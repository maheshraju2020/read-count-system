import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Link, useHistory } from "react-router-dom";
import LoggingTemplate from "./LoggingTemplate";
import "./CSS/SignIn.css";

export default function SignIn() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    };
    function clearErrors() {
        setEmailError("");
        setPasswordError("");
    }

    const SignInHandler = () => {
        clearErrors();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push("/stories-menu");
            })
            .catch((err) => {
                //Displaying various errors incase their is an error in authenticating.
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                    default:
                        setEmailError("Some Problem occured");
                        break;
                }
            });
    };

    // LifeCycle method, which will run, and do auto sign in, is the user is known
    useEffect(() => {
        clearInputs();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                history.push("/stories-menu");
            }
        });
    }, []);

    return (
        <div>
            <LoggingTemplate />
            <div id="SignIn">
                <h1 id="SignInTitle">Sign In</h1>
                <form
                    id="signInForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        SignInHandler();
                    }}
                >
                    <label className="signInPageLabel" for="email">
                        Email
                    </label>
                    <input
                        className="signInPageInput"
                        type="email"
                        name="email"
                        required
                        value={email}
                        placeholder="Enter email here ..."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p id="emailError">{emailError}</p>
                    <label className="signInPageLabel" for="password">
                        Password
                    </label>
                    <input
                        className="signInPageInput"
                        type="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password here ..."
                    />
                    <p id="passwordError">{passwordError}</p>
                    <button id="SignInbutton">Sign In</button>
                </form>
                <Link id="signUpMessage" to="/">
                    Don't have an account? Sign Up
                </Link>
            </div>
        </div>
    );
}
