import React, { useEffect, useState } from "react";
import axios from "axios";
import {ProfileHeader, ProfileBody, HorizontalLine, AccountList} from "../components/";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import { useParams } from 'react-router-dom';
import store from "../store";
import Unregistered from "./Unregistered"

// This picture is a placeholder for our presentation
import Picture3 from "../assets/profile-picture-2.jpg";

function Profile() {
    const { username } = useParams();

    const [games, setGames] = useState(0);
    const [numGames, setNumGames] = useState(0);
    const [user, setUser] = useState(0);


    const getProfile = async(username) => {
        try {
            const response = await axios.get(`https://ai.faceoff.cf/api/user/profile/${username}`);
            setUser(response.data.user);
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }

    /*var userID;

    if (store.getState().auth.isAuthenticated) {
        userID = store.getState().auth.user.userid;
    } else {
        userID = 0;
    }*/

    useEffect(() => {
        getProfile(username);
    }, []);

    useEffect(() => {
        getPastGames();
    }, []);

    const getPastGames = async() => {
        /*try {
            const response = await axios.get("https://ai.faceoff.cf/api/user/leaderboard");
            setGames(response.data.leaderboard);
            setNumGames(response.data.leaderboard.length);
            
        } catch (err) {
            console.error(err);
        }*/
    };

    if (!store.getState().auth.isAuthenticated) {
        return <Unregistered/>
    }

    return (
        <div className="Profile" class="container">
            <Grid container 
                spacing={{ xs: 2, md: 3 }} 
                columns={{ xs: 4, sm: 8, md: 12 }}
                align-items="center"
            >
                <Grid item xs={4} sm={6} md={8}>
                    <div class="basic-container col">
                        <ProfileHeader username={username} 
                                       picture={Picture3} 
                                       bio={user.bio}/>
                        <HorizontalLine color="#f7f7f7" width="100%" />
                        <ProfileBody username={username} highScore={user.bestScore} lowScore={user.worstScore}/>
                    </div>
                </Grid>
                <Box
                    component={Grid}
                    item
                    xs={2}
                    sm={3}
                    md={4}
                    visibility={{ xs: "hidden", sm: "visible", md: "visible" }}
                >
                    <div>
                        <div class="basic-container">
                            <AccountList title="You might know" />
                        </div>
                    </div>
                </Box>
            </Grid>
            <br />
        </div>
    );
}

export default Profile;