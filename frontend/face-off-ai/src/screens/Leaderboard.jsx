import React, { useEffect } from "react";
import LeaderboardList from "../components/LeaderboardList.jsx";
import { http } from "../store.js";

var userNum;

const leaderboard = async() => {
    try {
        let res = await http.get("https://ai.faceoff.cf/api/user/leaderboard");

        console.log("res.data: " + res.data.leaderboard);
        console.log("res json: " + JSON.stringify(res.data.leaderboard));
        userNum = Object.keys(res.data.leaderboard).length;
        console.log("size: " + size);

        {/*this.state = {
            //save individual components here
            id: res.userid,
            username: res.username,
            rank: res.worldRank
        }*/}

        return res;
    } catch (err) {
        console.error(err);
    }
    
};

function Leaderboard(props) {
    leaderboard();
    
    // TODO: fix the set state issue
    useEffect(() => {
        function handleStatusChange(status) {

        }
        //this.setState(leaderboard());
    });

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