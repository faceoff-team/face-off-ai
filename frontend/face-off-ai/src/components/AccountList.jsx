import React from "react";
import HorizontalLine from "../components/HorizontalLine.jsx";
import SmallProfile from "../components/SmallProfile.jsx";

/* These pictures are placeholders for our presentation */
import Picture from "../assets/joker-picture-1.jpg";
import Picture2 from "../assets/profile-picture-1.jpg";

function AccountList({title}) {
    return (
            <div>
                <h1 class="font-weight-heavy-small">{title}</h1>
                <HorizontalLine color="#f7f7f7" width="100%" />
                <div class="column">
                    <div class="row">
                        <SmallProfile username="sri29323" picture={Picture} />
                    </div>
                    <div class="row">
                        <SmallProfile username="ashtonS" />
                    </div>
                    <div class="row">
                        <SmallProfile username="lokiFlex23" picture={Picture2} />
                    </div>
                    <div class="row">
                        <SmallProfile username="byorne" />
                    </div>
                </div>
            </div>
    );
}

export default AccountList;



