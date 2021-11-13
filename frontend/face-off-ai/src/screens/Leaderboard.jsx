import React, { useEffect } from "react";
import LeaderboardList from "../components/LeaderboardList.jsx";
import { http } from "../store.js";


// Get leaderboard from the database 
const leaderboard = async() => {
    try {
        let res = await http.get("https://ai.faceoff.cf/api/user/leaderboard");
        console.log("res json: " + JSON.stringify(res.data.leaderboard));
        
        return JSON.stringify(res.data.leaderboard);
    } catch (err) {
        console.error(err);
    }
    
};

function Leaderboard(props) {
    var results = leaderboard();
    var userNum = results.value.length;
    console.log("results: " + results);
    console.log("results: " + results.value);
    console.log("results: " + userNum);

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