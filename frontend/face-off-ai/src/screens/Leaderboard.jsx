import React, { useEffect } from "react";
import LeaderboardList from "../components/LeaderboardList.jsx";
import { http } from "../store.js";



const leaderboard = async() => {
    try {
        let res = await http.get("/api/user/leaderboard");

        console.log(res);

        this.state = res;
    } catch (err) {
        console.error(err);
    }
    
};

function Leaderboard(props) {
    useEffect(() => {
        leaderboard();
    });

    return (
        <div className="leaderboard" class="container">
            <div class="basic-container">
                <h1 class="font-weight-heavy" style={{ marginTop: "10px" }}>Leaderboard</h1>
                <LeaderboardList props={props} />
            </div>
        </div>
    );
}

export default Leaderboard;