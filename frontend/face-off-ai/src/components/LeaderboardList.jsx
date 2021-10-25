import React from "react";
import HorizontalLine from "../components/HorizontalLine.jsx";
import LeaderboardItem from "../components/LeaderboardItem.jsx";

import Grid from '@mui/material/Grid';

function LeaderboardList({ title, LeaderboardUsers }) {
    return (
        <div>
            <h1 class="font-weight-heavy-small">{title}</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <Grid container columns={1}>
                <Grid item xs={8} >
                    <LeaderboardItem position="1" highscore="239299" username="xXbilbo_swagginsXx" />
                </Grid>
                <Grid item xs={8}>
                    <LeaderboardItem position="2" highscore="220030" username="tinguspingus" />
                </Grid>
                <Grid item xs={8}>
                    <LeaderboardItem position="3" highscore="220029" username="Asowwru"/>
                </Grid>
                <Grid item xs={8}>
                    <LeaderboardItem position="4" highscore="203000" username="AbandonedEgg" />
                </Grid>
            </Grid>
        </div>
    );
}

export default LeaderboardList;

