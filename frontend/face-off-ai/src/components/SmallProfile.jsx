import React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from '@mui/material/Grid';


function SmallProfile({ username, picture }) {
    return (
        <div class="small-profile">
            <div class="row">
                <Grid container>
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
    );
}

export default SmallProfile;