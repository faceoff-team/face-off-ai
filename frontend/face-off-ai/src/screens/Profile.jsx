import React from "react";

import ProfileHeader from "../components/ProfileHeader.jsx";
import ProfileBody from "../components/ProfileBody.jsx"
import HorizontalLine from "../components/HorizontalLine.jsx";
import SmallProfile from "../components/SmallProfile.jsx";

/* These pictures are placeholders for our presentation */
import Picture from "../assets/joker-picture-1.jpg";
import Picture2 from "../assets/profile-picture-1.jpg";
import Picture3 from "../assets/profile-picture-2.jpg";

function Profile() {
    return (
        <div className="about">
            <div class="container">
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