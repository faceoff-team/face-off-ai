import React from "react";

import ProfileHeader from "../components/ProfileHeader.jsx";
import ProfileBody from "../components/ProfileBody.jsx"
import HorizontalLine from "../components/HorizontalLine.jsx";
import AccountList from "../components/AccountList.jsx";
import Grid from '@mui/material/Grid';

/* This picture is a placeholder for our presentation */
import Picture3 from "../assets/profile-picture-2.jpg";

function Profile() {
    return (
        <div className="Profile">
            <Grid class="container">
                <div class="row">
                    <div class="col-8">
                        <div class="basic-container col">
                            <ProfileHeader username="MustardMan900" picture={Picture3} bio="Howdy yall I'm mr. musterd man"/>
                            <HorizontalLine color="#f7f7f7" width="100%" />
                            <ProfileBody />
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="basic-container">
                            <AccountList title="You might know"/>
                        </div>
                    </div>
                </div>
            </Grid>
        </div>
    );
}

export default Profile;