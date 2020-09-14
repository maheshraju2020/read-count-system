import React from "react";
import firebase from "firebase";
import plus from "../Images/plus.png";
import "./CSS/LeftDrawer.css";
import { useHistory } from "react-router-dom";

export default function LeftDrawer(props) {
    const history = useHistory();
    const username = firebase.auth().currentUser.email.split("@")[0];
    return (
        <div id="LeftDrawer">
            <div id="username">{username}</div>
            <div id="NotesMenu">
                <div className="notesOption" onClick={props.displayAllStories}>
                    All Stories
                </div>
                <div className="notesOption" onClick={props.displayNewStories}>
                    New Stories
                </div>
                <div className="notesOption" onClick={props.displaySeenStories}>
                    Seen Stories
                </div>
            </div>
            <div
                id="NewNote"
                onClick={() => {
                    history.push("/new-note");
                }}
            >
                <img id="plusIcon" alt="" srcset={plus} />
                <div id="NewNoteText">New Note</div>
            </div>
            <div
                id="SignOutButton"
                onClick={() => {
                    firebase.auth().signOut();
                }}
            >
                Sign Out
            </div>
        </div>
    );
}
