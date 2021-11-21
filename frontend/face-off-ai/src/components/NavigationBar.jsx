import React from "react";
import {Link, withRouter} from "react-router-dom";
import {MenuList, MenuItem} from '@mui/material';
import logo from "../assets/faceoff-ai-transparent-green.png";
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

import { ClickAwayListener } from '@mui/material';


function NavigationBar(props) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current == null) {
            setOpen(false);
        }
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        } else if (event.key === 'Escape') {
        setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            if (anchorRef.current != null) {
                anchorRef.current.focus();
            }
            
        }

        prevOpen.current = open;
    }, [open]);

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
                            <li
                                class={`nav-item ${props.location.pathname === "/profile" ? "active" : ""
                                    }`}
                            >
                                <Link class="nav-link" to={props.location.pathname} onClick={handleToggle} ref={anchorRef}>
                                    <Tooltip 
                                        title="Profile"
                                        TransitionComponent={Fade}
                                        TransitionProps={{ timeout: 300 }}>
                                    <AccountCircleIcon>
                                        <span class="sr-only">(current)</span>
                                    </AccountCircleIcon>
                                    </Tooltip>
                                    <Popper
                                        open={open}
                                        anchorEl={anchorRef.current}
                                        role={undefined}
                                        placement="bottom-start"
                                        transition
                                        >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                placement === 'top-start',
                                            }}
                                            >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown}
                                                    sx= {{
                                                            overflow: 'visible',
                                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                            mt: 1.5,
                                                            bgcolor: "#414246",
                                                            color: "white",
                                                            '& .MuiAvatar-root': {
                                                            width: 32,
                                                            height: 32,
                                                            ml: -0.5,
                                                            mr: 1,
                                                            },
                                                            '&:before': {
                                                            content: '""',
                                                            display: 'block',
                                                            position: 'absolute',
                                                            top: 0,
                                                            right: 14,
                                                            width: 10,
                                                            height: 10,
                                                            bgcolor: "#414246",
                                                            transform: 'translateY(-50%) rotate(45deg)',
                                                            zIndex: 0,
                                                            },
                                                        }}
                                                >
                                                    <Link to="/profile" 
                                                        style={{ 
                                                            textDecoration: "none",
                                                            color: "white"}}>
                                                        <MenuItem>
                                                            <Avatar /> Profile
                                                        </MenuItem>
                                                    </Link>
                                                    <Link to="/profile"
                                                        style={{ 
                                                            textDecoration: "none",
                                                            color: "white"}}>
                                                    <MenuItem>
                                                        <Avatar />My Account
                                                    </MenuItem>
                                                    </Link>
                                                    <Link to="/register"
                                                        style={{ 
                                                            textDecoration: "none",
                                                            color: "white"}}>
                                                        <MenuItem>
                                                        <ListItemIcon>
                                                            <PersonAdd fontSize="small" style={{ fill: "white"}}/>
                                                        </ListItemIcon>
                                                            Add another account
                                                        </MenuItem>
                                                    </Link>
                                                    <Link to="/logout"
                                                        style={{ 
                                                            textDecoration: "none",
                                                            color: "white"}}>
                                                        <MenuItem>
                                                        <ListItemIcon>
                                                            <Logout fontSize="small" style={{ fill: "white"}}/>
                                                        </ListItemIcon>
                                                            Logout
                                                        </MenuItem>
                                                    </Link>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                            </Grow>
                                        )}
                                        </Popper>
                                </Link>
                            </li>
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