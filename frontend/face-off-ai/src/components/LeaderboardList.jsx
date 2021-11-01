import React from "react";
import HorizontalLine from "../components/HorizontalLine.jsx";
import LeaderboardItem from "../components/LeaderboardItem.jsx";

import Grid from '@mui/material/Grid';

function getLeaders(numUsers) {
    const leaderboarditems = [];
    for (var i = 0; i < numUsers; i++) {
        leaderboarditems.push(<Grid item xs={8} >
            <LeaderboardItem position={i + 1} highscore="239299" username="xXbilbo_swagginsXx" />
        </Grid>)
    }
    return leaderboarditems;
}

function LeaderboardList({ title, LeaderboardUsers, numUsers }) {
    console.log(numUsers)    

    return (
        <div>
            <h1 class="font-weight-heavy-small">{title}</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <Grid container columns={1}>
                {getLeaders(numUsers)}
            </Grid>
        </div>
    );
}

export default LeaderboardList;

