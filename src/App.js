import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import firebase from "firebase";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import StoryPage from "./Components/StoryPage";
import StoriesMenu from "./Components/StoriesMenu";
import NewStoryPage from "./Components/NewStoryPage";

function App() {
    const [isUserLoggedIn, updateUserLoggedInStatus] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                updateUserLoggedInStatus(true);
            } else {
                updateUserLoggedInStatus(false);
            }
        });
    }, []);
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/sign-in" exact component={SignIn} />
                    <Route path="/" exact component={SignUp} />
                    <Route
                        path="/story"
                        exact
                        component={StoryPage}
                        // render={() =>
                        //     isUserLoggedIn ? <StoryPage /> : <Redirect to="/" />
                        // }
                    />
                    <Route
                        path="/stories-menu"
                        exact
                        render={() =>
                            isUserLoggedIn ? (
                                <StoriesMenu />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                    <Route
                        path="/new-note"
                        exact
                        render={() =>
                            isUserLoggedIn ? (
                                <NewStoryPage />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
