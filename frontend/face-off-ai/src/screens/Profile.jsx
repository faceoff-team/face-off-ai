import React from "react";
import Picture from "../assets/default-profile-picture.jpg";
import HorizontalLine from "../components/HorizontalLine.jsx";
import SmallProfile from "../components/SmallProfile.jsx";

function Profile() {
    return (
        <div className="about">
            <div class="container">
                <div class="row">
                    <div class="col-8">
                        <div class="basic-container col">
                            <div class="row">
                                <img src={Picture} alt="Profile" class="profile-img-medium"></img>
                            </div>
                            <div class="row">
                                <h1 class="font-weight-heavy">username</h1>
                            </div>
                            <HorizontalLine color="#f7f7f7" width="100%" />
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
                            <h1 class="font-weight-heavy-small">Friends</h1>
                            <HorizontalLine color="#f7f7f7" width="100%" />
                            <div class="column">
                                <div class="row">
                                    <SmallProfile username="sri29323" picture={Picture}/>
                                </div>
                                <div class="row">
                                    <SmallProfile username="ashtonS" picture={Picture} />
                                </div>
                                <div class="row">
                                    <SmallProfile username="lokiFlex23" picture={Picture} />
                                </div>
                                <div class="row">
                                    <SmallProfile username="byorne" picture={Picture} />
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