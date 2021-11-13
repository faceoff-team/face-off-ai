import React, { useEffect, useState } from "react";
import axios from "axios";
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
            /*const response = await fetch("https://ai.faceoff.cf/api/user/leaderboard");
            const jsonData = await response.json();*/

            const response = await axios.get("https://ai.faceoff.cf/api/user/leaderboard");
            console.log(response);
            console.log(response.leaderboard);
            setUserData(response.data);
            
            //console.log("res json: " + JSON.stringify(response.data.leaderboard));
            
            //setUserData(jsonData);
        } catch (err) {
            console.error(err);
        }
    };

    //console.log("HELLO:" + userData);

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