import React from "react";
import ReactPlayer from "react-player";

function HomePageBox({videoID}) {
    const videoURL = `https://www.youtube.com/watch?v=${videoID}`;
    const thumbnailURL = `http://img.youtube.com/vi/${videoID}/hqdefault.jpg`
    console.log(thumbnailURL);

    return (
        <div class="home-page-box">
            <div class="player-wrapper">
                <ReactPlayer class="react-player"
                    width={"auto"}
                    height={"auto"}
                    className="videoFrame"
                    url={videoURL}
                    light={thumbnailURL}
                />
            </div>
        </div>
    );
}

export default HomePageBox;