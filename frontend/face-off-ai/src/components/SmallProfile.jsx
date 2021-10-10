import React from "react";

function SmallProfile({ username, picture }) {
    return (
        <div class="small-profile">
            <div class="column">
                <div class="row">
                    <img class="profile-img-small" src={picture} alt="profile"></img>
                    <span class="small-profile-text">{username}</span>
                </div>
            </div>
        </div>
    );
}

export default SmallProfile;