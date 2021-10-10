import React from "react";
import ReactPlayer from 'react-player';

function HomePageBox({url}) {
    return (
        <div class="home-page-box">
            <div class="player-wrapper">
                <ReactPlayer class="react-player"
                    width={"auto"}
                    height={"auto"}
                    className="videoFrame"
                    url={url}
                    light={true}
                    controls
                    muted
                    config={{
                        youtube: {
                            playerVars: { showinfo: 1 }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default HomePageBox;