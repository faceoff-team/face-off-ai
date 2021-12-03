import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
// import { http } from "../store";

function LeaderboardItem({ username, picture, highscore, position}) {

    return (
        <div class="small-profile">
            <div class="row">
                <Grid container>
                    <Grid>
                        <div>{position}</div>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            borderRight: '0.05em solid #303134',
                            marginRight: '10px',
                            marginLeft: '10px'
                        }}
                    >
                        <Divider orientation="vertical" flexItem />
                    </Box>
                    <Grid >
                        <span>{highscore}</span>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            borderRight: '0.05em solid #303134',
                            marginRight: '10px',
                            marginLeft: '10px'
                        }}
                    >
                        <Divider orientation="vertical" flexItem />
                    </Box>
                    <Grid>
                        <Avatar
                            src={picture}
                            imageProps = {{ width: 100}}
                            sx={{ bgcolor: "#23430", marginRight: "20px" }}>
                            
                        </Avatar>
                    </Grid>
                    <Grid>
                        <div class="small-profile-text">{username}</div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default LeaderboardItem;