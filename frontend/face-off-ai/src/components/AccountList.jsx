import React from "react";
import HorizontalLine from "../components/HorizontalLine.jsx";
import SmallProfile from "../components/SmallProfile.jsx";


function getFriends(friendList, limit) {
    const friendListItems = [];
    try {
        var numUsers = friendList.length;
        if (numUsers > limit) {
            numUsers = limit;
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


function AccountList({title, userList, limit}) {
    return (
            <div>
                <h1 class="font-weight-heavy-small">{title}</h1>
                <HorizontalLine color="#f7f7f7" width="100%" />
                <div class="column">
                    {getFriends(userList, limit)}
                </div>
            </div>
    );
}

export default AccountList;



