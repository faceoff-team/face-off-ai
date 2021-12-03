/**
 * Small Profile
 * Ashton Statz
 * 
 * Displays a small box with some info on a user
 * links to their profile page.
 */

import React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from '@mui/material/Grid';
import { Link, withRouter} from "react-router-dom";

function SmallProfile({ username, picture }) {
    return (
        <Link to={`/profile/${username}`} style={{ textDecoration: 'none', color: "#FFFFFF",
        '&:hover': {
            backgroundColor: '#3a3b3f',
            color: '#4cc0ad',
        }}}>
            <div class="small-profile">
                <div class="row">
                    <Grid container >
                        <Grid>
                            <Avatar
                                src={picture}
                                sx={{ bgcolor: "#23430" }}>
                            </Avatar>
                        </Grid>
                        <Grid class="small-profile-text">
                            <div class="small-profile-text">{username}</div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Link>
    );
}

export default withRouter(SmallProfile);