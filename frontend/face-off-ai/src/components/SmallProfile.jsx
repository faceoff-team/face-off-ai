import React from "react";
import Avatar from "@material-ui/core/Avatar";

function SmallProfile({ username, picture }) {
    return (
        <div class="small-profile">
            <div class="column">
                <div class="row">
                    <Avatar 
                        src={picture}
                        sx={{ bgcolor: "#23430" }}>
                    </Avatar>
                    <span class="small-profile-text">{username}</span>
                </div>
            </div>
        </div>
    );
}

export default SmallProfile;