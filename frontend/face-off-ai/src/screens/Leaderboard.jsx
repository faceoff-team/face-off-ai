import React, { useEffect, useState } from "react";
import Axios from "axios";
import LeaderboardList from "../components/LeaderboardList.jsx";
import { http } from "../store.js";


// Get leaderboard from the database 
/*const leaderboard = async() => {
    try {
        

        //return response;
    } catch (err) {
        console.error(err);
    }
    
};*/

function Leaderboard(props) {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        leaderboard();
    }, []);

    const leaderboard = async() => {
        try {
            const response = await fetch("https://ai.faceoff.cf/api/user/leaderboard");
            const jsonData = await response.json();
            
            console.log("res json: " + JSON.stringify(response.data.leaderboard));
            
            setUserData(jsonData);
        } catch (err) {
            console.error(err);
        }
        
    };

    console.log(leaderboard.length);
    console.log(leaderboard[0]);

    var userNum = userData;
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