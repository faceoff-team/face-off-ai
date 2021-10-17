import React from "react";
import LeaderboardList from "../components/LeaderboardList.jsx";

function Leaderboard() {
    return (
        <div className="leaderboard" class="container">
            <div class="basic-container">
                <h1 class="font-weight-heavy" style={{ marginTop: "10px" }}>Leaderboard</h1>
                <LeaderboardList />
            </div>
        </div>
    );
}

export default Leaderboard;