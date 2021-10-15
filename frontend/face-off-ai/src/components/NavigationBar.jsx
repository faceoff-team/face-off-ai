import React from "react";
import {Link, withRouter} from "react-router-dom";
import logo from "../assets/faceoff-ai-transparent-green.png";
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

function NavigationBar(props) {
    return (
        <div className="navBar">
            <nav class="navbar navbar-expand navbar-dark">
                <Link class="navbar-brand" to="/home">
                    <img class="small-logo" alt="FACEOFF AI" src={logo}></img>
                </Link>
                <div class="navbar-align-right">
                    <ul class="navbar-nav ml-auto">
                        <li
                            class={`nav-item ${
                                props.location.pathname === "/" ? "active" : ""
                            }`}
                        >
                            <Link class="nav-link" to="/home">
                                <HomeIcon>
                                    <span class="sr-only">(current)</span>
                                </HomeIcon>
                            </Link>
                        </li>
                        <li
                            class={`nav-item ${props.location.pathname === "/leaderboards" ? "active" : ""
                                }`}
                        >
                            <Link class="nav-link" to="/leaderboards">
                                <LeaderboardIcon>
                                    <span class="sr-only">(current)</span>
                                </LeaderboardIcon>
                            </Link>
                        </li>
                        <li
                            class={`nav-item ${props.location.pathname === "/profile" ? "active" : ""
                                }`}
                        >
                            <Link class="nav-link" to="/profile">
                                <AccountCircleIcon>
                                    <span class="sr-only">(current)</span>
                                </AccountCircleIcon>
                            </Link>
                        </li>
                        <li
                            class={`nav-item ${props.location.pathname === "/settings" ? "active" : ""
                                }`}
                        >
                            <Link class="nav-link" to="/settings">
                                <SettingsIcon>
                                    <span class="sr-only">(current)</span>
                                </SettingsIcon>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default withRouter(NavigationBar);