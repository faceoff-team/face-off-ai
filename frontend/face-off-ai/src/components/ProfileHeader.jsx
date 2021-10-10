import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

function ProfileHeader({ username, picture, bio }) {
    return (
        <Grid container>
            <Grid item xs={10}>
            <Avatar 
                variant="circular" 
                src={picture}
                style={{ height: '100px', width: '100px' }}
            />
            <h1 class="font-weight-heavy">{username}</h1>
            <span class="font-small">{bio}</span>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" size="small">Edit Profile</Button>
            </Grid>
        </Grid>
    );
}

export default ProfileHeader
