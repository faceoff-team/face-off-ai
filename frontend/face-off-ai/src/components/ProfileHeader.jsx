import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

function ProfileHeader({ username, picture, bio }) {
    return (
        <Grid container row>
            <Grid>
            <Avatar 
                variant="circular" 
                src={picture}
                style={{ height: '100px', width: '100px' }}
            />
            <h1 class="font-weight-heavy">{username}</h1>
            <span class="font-small">{bio}</span>
            </Grid>
            <Grid alignItems="right">
                <div class="edit-profile-box">
                    <div class="top-left-box">
                        <Button variant="contained" size="small" color="secondary">Edit Profile</Button>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

export default ProfileHeader
