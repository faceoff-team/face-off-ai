import React, { useEffect, useState } from "react";
import axios from "axios";
import {ProfileHeader, ProfileBody, HorizontalLine, AccountList} from "../components/";
import Error404 from "../screens/Error404";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import { useParams } from 'react-router-dom';
import store from "../store";

function Profile() {
    const { username } = useParams();

    const [games, setGames] = useState(0);
    const [user, setUser] = useState(0);

    useEffect( async() => {
        await getProfile(username);
        if (user == null) {
            return <Error404 message=" Oops, no profile found" />
        }
        await getPastGames();
    }, []);


    const getProfile = async(username) => {
        try {
            const response = await axios.get(`https://ai.faceoff.cf/api/user/profile/${username}`);
            setUser(response.data.user[0]);
        } catch (err) {
            console.error(err);
        }
    };

    const getPastGames = async() => {
        try {
            const id = user.userID;
            const response = await axios.get(`https://ai.faceoff.cf/api/game/all/${id}`);
            setGames(response.data.games);
        } catch (err) {
            console.log(err);
        }
    };

    const getFriends = async() => {
        try {
            
        } catch (err) {
            console.log(err);
        }
    }

    
    /*if (!store.getState().auth.isAuthenticated) {
        return <Unregistered/>
    }*/

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
                                       picture={user.imagePath} 
                                       bio={user.bio}/>
                        <HorizontalLine color="#f7f7f7" width="100%" />
                        <ProfileBody 
                                username={username} 
                                highScore={user.bestScore}
                                lowScore={user.worstScore}
                                pastGames={games}/>
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