import React from "react";
import Picture from "../assets/joker-picture-1.jpg";
import Picture2 from "../assets/profile-picture-1.jpg";
import Picture3 from "../assets/profile-picture-2.jpg";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ProfileBody from "../components/ProfileBody.jsx"
import HorizontalLine from "../components/HorizontalLine.jsx";
import SmallProfile from "../components/SmallProfile.jsx";

function Profile() {
    return (
        <div className="about">
            <div class="container">
                <div class="row">
                    <div class="col-8">
                        <div class="basic-container col">
                            <ProfileHeader username="MustardMan900" picture={Picture3}/>
                            <HorizontalLine color="#f7f7f7" width="100%" />
                            <ProfileBody />
                            <div class="row">
                                Bio: Testing here would be a little bio for someone to put stuff
                            </div>
                            <div class="row">
                                High Score: 100
                            </div>
                            <div class="row">
                                Following 130 Followers 130
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="basic-container">
                            <h1 class="font-weight-heavy-small">You might know</h1>
                            <HorizontalLine color="#f7f7f7" width="100%" />
                            <div class="column">
                                <div class="row">
                                    <SmallProfile username="sri29323" picture={Picture} />
                                </div>
                                <div class="row">
                                    <SmallProfile username="ashtonS"  />
                                </div>
                                <div class="row">
                                    <SmallProfile username="lokiFlex23" picture={Picture2} />
                                </div>
                                <div class="row">
                                    <SmallProfile username="byorne"/>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;