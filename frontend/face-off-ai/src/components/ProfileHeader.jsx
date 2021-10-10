import React from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

function ProfileHeader({ username, picture }) {
    return (
        <div class="container">
            <Avatar class="profile-img-medium"
                src={picture}
                >
                </Avatar>
                
            <h1 class="font-weight-heavy">{username}</h1>
            <Button variant="contained" size="small">Edit Profile</Button>
        </div>
    );
}

export default ProfileHeader
