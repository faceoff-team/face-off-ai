import React, { useEffect, useState, Linking } from "react";
import axios from "axios";

import ProfileHeader from "../components/ProfileHeader.jsx";
import ProfileBody from "../components/ProfileBody.jsx"
import HorizontalLine from "../components/HorizontalLine.jsx";
import AccountList from "../components/AccountList.jsx";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Fade from '@mui/material/Fade';

import store from "../store";
import Unregistered from "./Unregistered"


// This picture is a placeholder for our presentation
import Picture3 from "../assets/profile-picture-2.jpg";
import { Button } from "@mui/material";


function Profile() {

    const [games, setGames] = useState(0);
    const [numGames, setNumGames] = useState(0);

    useEffect(() => {
        getPastGames();
    }, []);

    const getPastGames = async() => {
        try {
            const response = await axios.get("https://ai.faceoff.cf/api/user/leaderboard");
            setGames(response.data.leaderboard);
            setNumGames(response.data.leaderboard.length);
            
        } catch (err) {
            console.error(err);
        }
    };

    const postOnFacebook = () => {
        let facebookParameters = [];
        let facebookShareURL = "https://cf.faceoff.ai/home";
        let postContent = "Check out FACEOFF AI"
        if (facebookShareURL)
          facebookParameters.push('u=' + encodeURI(facebookShareURL));
        if (postContent)
          facebookParameters.push('quote=' + encodeURI(postContent));
        const url =
          'https://www.facebook.com/sharer/sharer.php?'
           + facebookParameters.join('&');
    
        Linking.openURL(url)
          .then((data) => {
            alert('Facebook Opened');
          })
          .catch(() => {
            alert('Something went wrong');
          });
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
                        <ProfileHeader username="MustardMan900" picture={Picture3} bio="Howdy yall I'm mr. musterd man"/>
                        <HorizontalLine color="#f7f7f7" width="100%" />
                        <ProfileBody username="MustardMan900" />
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
            <Button onPress={postOnFacebook}>Share on Facebook</Button>
        </div>
    );
}

export default Profile;