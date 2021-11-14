import React, { useEffect, useState } from "react";
import axios from "axios";
import LeaderboardList from "../components/LeaderboardList.jsx";


function Leaderboard(props) {

    const [users, setUsers] = useState(0);
    const [numUsers, setNumUsers] = useState(0);

    useEffect(() => {
        leaderboard();
    }, []);

    const leaderboard = async() => {
        try {

            const response = await axios.get("https://ai.faceoff.cf/api/user/leaderboard");
            setUsers(response.data.leaderboard);
            setNumUsers(response.data.leaderboard.length);
            
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="leaderboard" class="container">
            <div class="basic-container">
                <h1 class="font-weight-heavy" style={{ marginTop: "10px" }}>Leaderboard</h1>
                <LeaderboardList props={props} numUsers={numUsers} leaderboardUsers={users} />
            </div>
        </div>
    );
}

export default Leaderboard;