import React, { useEffect } from "react";
import LeaderboardList from "../components/LeaderboardList.jsx";
import { http } from "../store.js";



const leaderboard = async() => {
    try {
        let res = await http.get("/api/user/leaderboard");

        console.log("Hello, res: " + res);

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
                <LeaderboardList props={props} numUsers={25}/>
            </div>
        </div>
    );
}

export default Leaderboard;