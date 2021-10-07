import React from "react";
import Picture from "../assets/default-profile-picture.jpg";
import HorizontalLine from "../components/HorizontalLine.jsx";

function Profile() {
    return (
        <div className="about">
            <div class="container">
                <div class="row">
                    <div class="col-9">
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
                    <div class="col-3">
                        <div class="basic-container">
                            <h1 class="font-weight-heavy">Friends</h1>
                            <div>friend profile 1</div>
                            <div>friend profile 2</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;