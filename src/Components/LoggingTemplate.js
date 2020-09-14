import React from "react";
import { NavLink } from "react-router-dom";
import "./CSS/LoggingTemplate.css";

export default function LoggingTemplate(props) {
    return (
        <div id="MainCard">
            <div id="LeftPortion"></div>
            <div id="FormPortion">
                <div id="PageSwitcher">
                    <NavLink
                        exact
                        to="/sign-in"
                        activeClassName="ActiveSwitchItem"
                        className="SwitchItem"
                    >
                        Sign In
                    </NavLink>
                    <NavLink
                        exact
                        to="/"
                        activeClassName="ActiveSwitchItem"
                        className="SwitchItem"
                    >
                        Sign Up
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
