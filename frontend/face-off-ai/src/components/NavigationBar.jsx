import React from "react";
import {Link, withRouter} from "react-router-dom";
import logo from "./img/faceoff-ai-transparent-light-blue.png";

function NavigationBar(props) {
    return (
        <div className="navBar">
            <nav class="navbar navbar-expand navbar-dark bg-dark">
                <div class="container">
                    <Link class="navbar-brand" to="/">
                        <img class="small-logo" src={logo}></img>
                    </Link>

                    <div>
                        <ul class="navbar-nav ml-auto">
                            <li
                                class={`nav-item ${
                                    props.location.pathname === "/" ? "active" : ""
                                }`}
                            >
                                <Link class="nav-link" to="/">
                                    Home
                                    <span class="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li
                                class={`nav-item ${props.location.pathname === "/About" ? "active" : ""
                                    }`}
                            >
                                <Link class="nav-link" to="/About">
                                    About
                                    <span class="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li
                                class={`nav-item ${props.location.pathname === "/Settings" ? "active" : ""
                                    }`}
                            >
                                <Link class="nav-link" to="/Settings">
                                    Settings
                                    <span class="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li
                                class={`nav-item ${props.location.pathname === "/Profile" ? "active" : ""
                                    }`}
                            >
                                <Link class="nav-link" to="/Profile">
                                    Profile
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