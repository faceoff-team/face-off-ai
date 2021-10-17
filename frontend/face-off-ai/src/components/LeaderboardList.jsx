import React from "react";
import HorizontalLine from "../components/HorizontalLine.jsx";
import LeaderboardListing from "../components/LeaderboardListing.jsx";

/* These pictures are placeholders for our presentation */
import Picture from "../assets/joker-picture-1.jpg";
import Picture2 from "../assets/profile-picture-1.jpg";

import Grid from '@mui/material/Grid';

function LeaderboardList({ title }) {
    return (
        <div>
            <h1 class="font-weight-heavy-small">{title}</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <div class="column">
                <div class="row">
                    <LeaderboardListing position="1" highscore="239299" username="xXbilbo_swagginsXx" />
                </div>
                <div class="row">
                    <LeaderboardListing position="2" highscore="220030" username="tinguspingus" />
                </div>
                <div class="row">
                    <LeaderboardListing position="3"/>
                </div>
                <div class="row">
                    <LeaderboardListing position="4" />
                </div>
            </div>
        </div>
    );
}

export default LeaderboardList;

