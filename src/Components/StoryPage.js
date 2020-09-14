import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./CSS/StoryPage.css";
import back from "../Images/back.png";
import firebase from "firebase";

export default function StoryPage(props) {
    const history = useHistory();
    const [story, updateStory] = useState({
        live: [],
        viewers: [],
    });

    const headerJsx = (
        <div id="header">
            <div id="StoryTitle">{story["title"]}</div>
            <div id="Author">Author : {story["author"]}</div>
            <div id="PostedOn">Posted On : {story["date"]}</div>
        </div>
    );

    const storyJsx = <div id="story">{story["story"]}</div>;

    const liveCountJsx = <div id="LiveCount">{story["live"].length}</div>;

    const storyCountJsx = (
        <div id="storyViewsCount">{story["viewers"].length}</div>
    );

    // This will handle the case when the user abruptly closes the tab or the browser (updating live user count).
    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            firebase
                .firestore()
                .collection("stories")
                .doc(props.location.state["id"])
                .update({
                    live: [...props.location.state["live"]],
                });
        });
    }, []);

    useEffect(() => {
        console.log(props.location.state);
        if (!props.location.state) {
            history.goBack();
        }
        const email = firebase.auth().currentUser.email;
        firebase
            .firestore()
            .collection("stories")
            .doc(props.location.state["id"])
            .get()
            .then((story) => {
                const curStory = story.data();
                if (!curStory["viewers"].includes(email)) {
                    firebase
                        .firestore()
                        .collection("stories")
                        .doc(props.location.state["id"])
                        .update({
                            viewers: [...curStory["viewers"], email],
                        });
                }
                if (!curStory["live"].includes(email)) {
                    firebase
                        .firestore()
                        .collection("stories")
                        .doc(props.location.state["id"])
                        .update({
                            live: [...curStory["live"], email],
                        });
                }
            })
            .then(() =>
                firebase
                    .firestore()
                    .collection("stories")
                    .onSnapshot((oberver) => {
                        console.log(oberver);
                        let notes = {};
                        oberver.docs.map((cur) => {
                            const data = cur.data();
                            if (cur.id === props.location.state["id"]) {
                                notes = data;
                            }
                            return null;
                        });
                        updateStory(notes);
                    })
            );
    }, []);

    // This lifecycle method will handle liveUserCount when the current component is closed/destroyed.
    useEffect(
        () => () => {
            const email = firebase.auth().currentUser.email;
            firebase
                .firestore()
                .collection("stories")
                .doc(props.location.state["id"])
                .get()
                .then((story) => {
                    const liveViewers = story.data()["live"];
                    let newLiveList = [];
                    for (let i = 0; i < liveViewers.length; i++) {
                        if (liveViewers[i] !== email) {
                            newLiveList.push(liveViewers[i]);
                        }
                    }
                    firebase
                        .firestore()
                        .collection("stories")
                        .doc(props.location.state["id"])
                        .update({
                            live: newLiveList,
                        });
                });
        },
        []
    );

    return (
        <div id="StoryPortion">
            <div id="backButton" onClick={() => history.goBack()}>
                <img alt="" srcset={back} />
            </div>
            <div id="StoryLeftPortion">
                {headerJsx}
                {storyJsx}
            </div>
            <div id="StoryRightPortion">
                <div id="TotalViews">
                    {storyCountJsx}
                    <div id="storyViewsText">Total Views</div>
                </div>
                <div id="LiveReads">
                    {liveCountJsx}
                    <div id="LiveText">Currently Viewing</div>
                </div>
            </div>
        </div>
    );
}
