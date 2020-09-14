import React from "react";
import { Link } from "react-router-dom";
import seen from "../Images/seen.png";
import "./CSS/Cards.css";

export default function CardsJSX(cardDetails, email) {
    const cardsJsx = cardDetails.map((story) => (
        <Link
            key={story["id"]}
            style={{ textDecoration: "none" }}
            to={{
                pathname: "/story",
                state: story,
            }}
        >
            <div className="card" key={story["id"]}>
                <div className="details">
                    <div className="CardTitle">{story["title"]}</div>
                    <div className="CardTime">{story["date"]}</div>
                    <div className="CardAuthor">By: {story["author"]}</div>
                </div>
                <div className="views">
                    <div className="CardTotViews">
                        {story["viewers"].length} views
                    </div>
                    <div className="CardLive">
                        {story["live"].length} reading now
                    </div>
                    {story["viewers"].includes(email) ? (
                        <img className="seen" srcset={seen} alt="" />
                    ) : null}
                </div>
            </div>
        </Link>
    ));
    return cardsJsx;
}
