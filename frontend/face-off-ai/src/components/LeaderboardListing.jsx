import React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from '@mui/material/Grid';

function LeaderboardListing({ username, picture, highScore, position}) {
    return (
        <div class="small-profile">
            <div class="row">
                <Grid container>
                    <Grid class="small-profile-text">
                        <span class="small-profile-text">{position}</span>
                    </Grid>
                    <Grid>
                        <Avatar
                            src={picture}
                            sx={{ bgcolor: "#23430" }}>
                        </Avatar>
                    </Grid>
                    <Grid>
                        <div>{highScore}</div>
                    </Grid>
                    <Grid class="small-profile-text">
                        <div class="small-profile-text">{username}</div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default LeaderboardListing;