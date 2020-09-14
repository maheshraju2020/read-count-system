import React, { useEffect, useState } from "react";
import LeftDrawer from "./LeftDrawer";
import "./CSS/StoriesPortion.css";
import CardsJSX from "./Cards";
import firebase from "firebase";

export default function StoriesMenu() {
    const [StoryList, UpdateList] = useState([{ viewers: [], live: [] }]);
    const email = firebase.auth().currentUser.email;

    useEffect(() => {
        displayAllStories();
    }, []);

    function displayAllStories() {
        firebase
            .firestore()
            .collection("stories")
            .onSnapshot((update) => {
                const stories = update.docs.map((cur) => {
                    const data = cur.data();
                    data["id"] = cur.id;
                    return data;
                });
                console.log(stories);
                UpdateList(stories);
            });
    }

    function displaySeenStories() {
        firebase
            .firestore()
            .collection("stories")
            .onSnapshot((update) => {
                const stories = [];
                update.docs.map((cur) => {
                    const data = cur.data();
                    data["id"] = cur.id;
                    if (data["viewers"].includes(email)) {
                        stories.push(data);
                    }
                    return null;
                });
                UpdateList(stories);
            });
    }
    function displayNewStories() {
        firebase
            .firestore()
            .collection("stories")
            .onSnapshot((update) => {
                const stories = [];
                update.docs.map((cur) => {
                    const data = cur.data();
                    data["id"] = cur.id;
                    if (!data["viewers"].includes(email)) {
                        stories.push(data);
                    }
                    return null;
                });
                UpdateList(stories);
            });
    }
    return (
        <div id="StoryPageMainCard">
            <LeftDrawer
                displaySeenStories={displaySeenStories}
                displayAllStories={displayAllStories}
                displayNewStories={displayNewStories}
            />
            <div id="Stories">
                <div id="MainStoryTitle">Enjoy the Stories!</div>
                <div id="StoryCards">
                    {CardsJSX(StoryList, email)}
                    <div className="ending">
                        <hr id="line" />
                        <div id="endline1">You're All Caught Up</div>
                        <div className="endline" id="endLine2">
                            You've seen all posts
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
