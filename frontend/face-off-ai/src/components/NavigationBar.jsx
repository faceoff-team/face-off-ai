import React from "react";
import {Link, withRouter} from "react-router-dom";
import logo from "../assets/faceoff-ai-transparent-light-blue.png";

function NavigationBar(props) {
    return (
        <div className="navBar">
            <nav class="navbar navbar-expand navbar-dark">
                <div class="container">
                    <Link class="navbar-brand" to="/">
                        <img class="small-logo" alt="FACEOFF AI" src={logo}></img>
                    </Link>
                    <div>
                        <ul class="navbar-nav ml-auto">
                            <li
                                class={`nav-item ${
                                    props.location.pathname === "/" ? "active" : ""
                                }`}
                            >
                                <Link class="nav-link" to="/home">
                                    <span class="material-icons md-18">
                                        home
                                        <span class="sr-only">(current)</span>
                                    </span>
                                </Link>
                            </li>
                            <li
                                class={`nav-item ${props.location.pathname === "/leaderboards" ? "active" : ""
                                    }`}
                            >
                                <Link class="nav-link" to="/leaderboards">
                                    <span class="material-icons md-18">
                                        leaderboard
                                        <span class="sr-only">(current)</span>
                                    </span>
                                </Link>
                            </li>
                            <li
                                class={`nav-item ${props.location.pathname === "/profile" ? "active" : ""
                                    }`}
                            >
                                <Link class="nav-link" to="/profile">
                                    <span class="material-icons md-18">
                                        account_circle
                                    </span>
                                    <span class="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li
                                class={`nav-item ${props.location.pathname === "/settings" ? "active" : ""
                                    }`}
                            >
                                <Link class="nav-link" to="/settings">
                                    <span class="material-icons md-18">settings</span>
                                    <span class="sr-only">(current)</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default withRouter(NavigationBar);