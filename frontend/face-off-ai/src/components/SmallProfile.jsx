import React from "react";
import Avatar from "@mui/material/Avatar";

function SmallProfile({ username, picture }) {
    return (
        <div class="small-profile">
            <div class="column">
                <div class="row">
                    <Avatar 
                        src={picture}
                        sx={{ bgcolor: "#23430" }}>
                    </Avatar>
                    <div class="small-profile-text">{username}</div>
                </div>
            </div>
        </div>
    );
}

export default SmallProfile;