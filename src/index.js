import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const firebase = require("firebase");
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyAHFr4Etizc-56R4SeG1MLWuGabk0x_R9A",
    authDomain: "read-count-system-c51b3.firebaseapp.com",
    databaseURL: "https://read-count-system-c51b3.firebaseio.com",
    projectId: "read-count-system-c51b3",
    storageBucket: "read-count-system-c51b3.appspot.com",
    messagingSenderId: "367975214753",
    appId: "1:367975214753:web:1b2bd8227b0f07a4c74ae0",
    measurementId: "G-FNMF77VG5P",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
