import React, { useState } from "react";
import firebase from "firebase";
import getTodaysDate from "./GetDate";
import "./CSS/NewStory.css";
import { useHistory } from "react-router-dom";

export default function NewStoryPage() {
    const history = useHistory();
    const [title, updateTitle] = useState("");
    const [story, updateStory] = useState("");

    // updates the new story in the database
    function storySubmitter() {
        const username = firebase.auth().currentUser.email.split("@")[0];
        const db = firebase.firestore();
        db.collection("stories").add({
            author: username,
            title: title,
            date: getTodaysDate(),
            story: story,
            viewers: [],
            live: [],
        });
        history.goBack();
    }
    return (
        <div id="JustForBackground">
            <div id="MainDiv">
                <div id="divTitle">Write a New Story</div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        storySubmitter();
                    }}
                >
                    <div id="titleInput">
                        <div id="TitleName">Title</div>
                        <input
                            type="text"
                            id="storyTitle"
                            required
                            maxLength="26"
                            value={title}
                            onChange={(e) => updateTitle(e.target.value)}
                            placeholder="Enter Title Here"
                        />
                    </div>
                    <textarea
                        id="storyArea"
                        name="story"
                        required
                        value={story}
                        onChange={(e) => updateStory(e.target.value)}
                        placeholder="Write Your Story Here..."
                    ></textarea>
                    <button id="submitButton">SUBMIT</button>
                </form>
            </div>
        </div>
    );
}
