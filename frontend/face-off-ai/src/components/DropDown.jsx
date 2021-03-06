import React, { useState, useEffect } from "react";
import {MenuList, MenuItem} from '@mui/material';
import {Link, withRouter} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import {Grow, Paper, Popper, Tooltip, Fade} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from '../actions/authActions';
import axios from 'axios';
import store from "../store";

import { ClickAwayListener } from '@mui/material';


function DropDown(props) {

    const [open, setOpen] = React.useState(false);
    const [profilePic, setProfilePic] = useState(0);
    const anchorRef = React.useRef(null);

    const username = props.username;

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

    const handleLogout = async (event) => {
        window.location.reload(false);
        //await logout();
    }
    

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    useEffect(() => {
        getProfile(username);
    });

    const getProfile = async(username) => {
        try {
            if (store.getState().auth.isAuthenticated) {
                const response = await axios.get(`https://ai.faceoff.cf/api/user/profile/${username}`);
                setProfilePic(response.data.user[0].imagePath);
            }
        } catch (err) {
            console.error(err);
        }
    };


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

    return(
        <li class={`nav-item ${props.location.pathname === `/profile/${username}` ? "active" : ""}`}>
            <Link class="nav-link" to={props.location.pathname} onClick={handleToggle} ref={anchorRef}>
                <Tooltip 
                    title="Profile"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}>
                <AccountCircleIcon>
                    <span class="sr-only">(current)</span>
                </AccountCircleIcon>
                </Tooltip>
            </Link>
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
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
            >
            <Paper sx={{ borderRadius: "11px"}}>
                <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    onClick={handleToggle}
                    sx= {{
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            borderRadius: "10px",
                            bgcolor: "#414246",
                            color: "white",
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                        }}
                >
                    <Link to={`/profile/${username}`}
                        style={{ 
                            textDecoration: "none",
                            color: "white"}}>
                        <MenuItem>
                            <Avatar src={profilePic}/> Profile
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
                        <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" style={{ fill: "white"}}/>
                        </ListItemIcon>
                            Logout
                        </MenuItem>
                    </MenuList>
                </ClickAwayListener>
            </Paper>
            </Grow>
        )}
        </Popper></li>);
}
  

export default withRouter(DropDown);