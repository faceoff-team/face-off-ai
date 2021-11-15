import React from "react";
import HorizontalLine from "../components/HorizontalLine.jsx";
import LeaderboardItem from "../components/LeaderboardItem.jsx";

import Grid from '@mui/material/Grid';

const MAX_LEADERBOARD_USERS = 25;

function getLeaders(numUsers, leaderboardUsers) {
    const leaderboarditems = [];
    if (numUsers > MAX_LEADERBOARD_USERS) {
        numUsers = MAX_LEADERBOARD_USERS;
    } else if (numUsers == 0) {
        leaderboarditems.push(<Grid item xs={8} >
            <div>There are no users to display.</div>
                             </Grid>)
    }

    for (var i = 0; i < numUsers; i++) {
        if (leaderboardUsers[i].bestScore < 0) {
            leaderboarditems.push(<Grid item xs={8} >
                <LeaderboardItem position={i + 1} 
                                 highscore={"0"}
                                 username={leaderboardUsers[i].username}
                                 picture={leaderboardUsers[i].imagePath}
                                 />
                                 </Grid>)
        } else {
            leaderboarditems.push(<Grid item xs={8} >
                <LeaderboardItem position={i + 1} 
                                highscore={leaderboardUsers[i].bestScore}
                                username={leaderboardUsers[i].username}
                                picture={leaderboardUsers[i].imagePath}
                                />
                                </Grid>)
        }
        
        
    }
    return leaderboarditems;
}

function LeaderboardList({ title, leaderboardUsers, numUsers }) {  
    return (
        <div>
            <h1 class="font-weight-heavy-small">{title}</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <Grid container columns={1}>
                {getLeaders(numUsers, leaderboardUsers)}
            </Grid>
        </div>
    );
}

export default LeaderboardList;

