import React, { useEffect } from "react";
import LeaderboardList from "../components/LeaderboardList.jsx";
import { http } from "../store.js";



const leaderboard = async() => {
    try {
        let res = await http.get("https://ai.faceoff.cf/api/user/leaderboard");
        console.log("res json: " + JSON.stringify(res.data.leaderboard));
        var userNum = (res.data.leaderboard).length;
        console.log("size: " + userNum);

        return userNum;
    } catch (err) {
        console.error(err);
    }
    
};

function Leaderboard(props) {
    leaderboard();

    return (
        <div className="leaderboard" class="container">
            <div class="basic-container">
                <h1 class="font-weight-heavy" style={{ marginTop: "10px" }}>Leaderboard</h1>
                <LeaderboardList props={props} numUsers={3}/>
            </div>
        </div>
    );
}

export default Leaderboard;