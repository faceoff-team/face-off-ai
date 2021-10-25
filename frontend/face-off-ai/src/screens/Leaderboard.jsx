import React from "react";
import LeaderboardList from "../components/LeaderboardList.jsx";
import { http } from "../store.js";

function Leaderboard() {
    http.get("/api/")

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