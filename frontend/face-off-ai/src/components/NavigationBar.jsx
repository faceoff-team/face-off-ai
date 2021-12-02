import React from "react";
import {Link, withRouter} from "react-router-dom";
import logo from "../assets/faceoff-ai-transparent-green.png";
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import DropDown from "./DropDown";


function NavigationBar(props) {

    return (
            <div className="navBar">
                <nav class="navbar navbar-expand navbar-dark">
                    <div class="container">
                        <Link class="navbar-brand" to="/home">
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
                                        <Tooltip 
                                            title="Home"
                                            TransitionComponent={Fade}
                                            TransitionProps={{ timeout: 300 }}>
                                        <HomeIcon>
                                            <span class="sr-only">(current)</span>
                                        </HomeIcon>
                                        </Tooltip>
                                    </Link>
                                </li>
                                <li
                                    class={`nav-item ${props.location.pathname === "/leaderboards" ? "active" : ""
                                        }`}
                                >
                                    <Link class="nav-link" to="/leaderboards">
                                        <Tooltip 
                                            title="Leaderboard"
                                            TransitionComponent={Fade}
                                            TransitionProps={{ timeout: 300 }}>
                                        <LeaderboardIcon>
                                            <span class="sr-only">(current)</span>
                                        </LeaderboardIcon>
                                        </Tooltip>
                                    </Link>
                                </li>
                                <DropDown username=""/>
                                <li
                                    class={`nav-item ${props.location.pathname === "/settings" ? "active" : ""
                                        }`}
                                >
                                    <Link class="nav-link" to="/settings">
                                        <Tooltip 
                                            title="Settings"
                                            TransitionComponent={Fade}
                                            TransitionProps={{ timeout: 300 }}>
                                        <SettingsIcon>
                                            <span class="sr-only">(current)</span>
                                        </SettingsIcon>
                                        </Tooltip>
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