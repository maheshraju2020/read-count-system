import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./CSS/SignUp.css";
import LoggingTemplate from "./LoggingTemplate";

export default function SignUp() {
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
    const SignUpHandler = () => {
        clearErrors();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                //Displaying various errors incase their is an error in authenticating.
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/email-already-in-use":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                    default:
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
            <div id="SignUp">
                <h1 id="SignUpTitle">Sign Up</h1>
                <form
                    id="signUpForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        SignUpHandler();
                    }}
                >
                    <label className="signUpPageLabel" for="email">
                        Email
                    </label>
                    <input
                        className="signUpPageInput"
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email here ..."
                    />
                    <p id="emailError">{emailError}</p>
                    <label className="signUpPageLabel" for="password">
                        Password
                    </label>
                    <input
                        className="signUpPageInput"
                        type="password"
                        name="password"
                        required
                        minLength="6"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password here ..."
                    />
                    <p id="passwordError">{passwordError}</p>
                    <button id="SignUpbutton">Sign Up</button>
                </form>
                <Link id="signInMessage" to="/sign-in">
                    Already a member? Sign In
                </Link>
            </div>
        </div>
    );
}
