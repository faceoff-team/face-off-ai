import React from "react";
import HorizontalLine from "../components/HorizontalLine.jsx";
import SmallProfile from "../components/SmallProfile.jsx";

const MAX_FRIENDS = 10;

function getFriends(friendList) {
    const friendListItems = [];
    try {
        var numUsers = friendList.length;
        if (numUsers > MAX_FRIENDS) {
            numUsers = MAX_FRIENDS;
        } else if (numUsers == 0) {
            friendListItems.push(<div class="row">
                <div>There are no users to display.</div>
            </div>)
        }

        for (var i = 0; i < numUsers; i++) {
            friendListItems.push(<div class="row">
                    <SmallProfile 
                                    username={friendList[i].username}
                                    picture={friendList[i].imagePath}
                                    />
                                    </div>);
        }
        return friendListItems;
    } catch (err) {
        
    }
    
}


function AccountList({title, userList}) {
    return (
            <div>
                <h1 class="font-weight-heavy-small">{title}</h1>
                <HorizontalLine color="#f7f7f7" width="100%" />
                <div class="column">
                    {getFriends(userList)}
                </div>
            </div>
    );
}

export default AccountList;



