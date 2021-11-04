import React from "react";
import Linking from "react";
import useState from "react";

import ProfileHeader from "../components/ProfileHeader.jsx";
import ProfileBody from "../components/ProfileBody.jsx"
import HorizontalLine from "../components/HorizontalLine.jsx";
import AccountList from "../components/AccountList.jsx";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";


/* This picture is a placeholder for our presentation */
import Picture3 from "../assets/profile-picture-2.jpg";
import { Button } from "@mui/material";



function Profile() {
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