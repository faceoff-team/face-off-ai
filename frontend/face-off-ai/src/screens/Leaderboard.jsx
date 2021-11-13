import React, { useEffect } from "react";
import LeaderboardList from "../components/LeaderboardList.jsx";
import { http } from "../store.js";


// Get leaderboard from the database 
const leaderboard = async() => {
    try {
        let res = await http.get("https://ai.faceoff.cf/api/user/leaderboard");
        console.log("res json: " + JSON.stringify(res.data.leaderboard));
        
        return res;
    } catch (err) {
        console.error(err);
    }
    
};

function Leaderboard(props) {
    var results = leaderboard();
    
    console.log("results: " + JSON.stringify(results.data.leaderboard));

    var userNum = 1;
    return (
        <div className="leaderboard" class="container">
            <div class="basic-container">
                <h1 class="font-weight-heavy" style={{ marginTop: "10px" }}>Leaderboard</h1>
                <LeaderboardList props={props} numUsers={userNum}/>
            </div>
        </div>
    );
}

export default Leaderboard;