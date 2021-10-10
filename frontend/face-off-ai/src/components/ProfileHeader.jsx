import React from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

function ProfileHeader({ username, picture }) {
    return (
        <div>
            <Avatar 
                variant="circular" 
                src={picture}
                style={{ height: '100px', width: '100px' }}
            />
            <h1 class="font-weight-heavy">{username}</h1>
            <div>
                <Button variant="contained" size="small">Edit Profile</Button>
            </div>
        </div>
    );
}

export default ProfileHeader
