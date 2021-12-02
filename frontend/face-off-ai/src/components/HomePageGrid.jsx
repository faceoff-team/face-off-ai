import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from '@mui/material/Grid';
import HomePageBox from "./HomePageBox.jsx";

const MAX_VIDEOS = 9;

/**
 *  Compiles a list of videos given the video array and
 *  the number of videos in the list.
 */
function videosList(numVideos, videoArray) {
    const videoList = [];
    
    if (numVideos === 0 || videoArray == null) {
        videoList.push(<Grid item xs={8} >
            <div>There are no videos to display.</div>
                             </Grid>)
        return videoList;
    }

    // We only want to show MAX_VIDEOS videos maximum for each list
    if (numVideos > MAX_VIDEOS) {
        numVideos = MAX_VIDEOS;
    }

    for (var i = 0; i < numVideos; i++) {
        if (videoArray[i] == null) {
            return videoList;
        }
        videoList.push(<Grid item xs={2} sm={4} md={4} key={i}>
            <HomePageBox videoID={videoArray[i].videoYoutubeID}
                         videoTitle={videoArray[i].videoTitle}
                         videoKey={videoArray[i].videoID}
                        />
                        </Grid>)
    }
    return videoList;
}

function HomePageGrid({emotionID}) {

    const [videos, setVideos] = useState(0);
    const [numVideos, setNumVideos] = useState(0);

    useEffect(() => {
        getVideoAPI();
    }, []);

    const getVideoAPI = async() => {
        try {
            var baseURL = "https://ai.faceoff.cf/api/video/"
            if (emotionID == 1) {
                // This is a try not to laugh video set
                baseURL += "happy";
            } else if (emotionID == 2) {
                // This is a try not to cry video set
                baseURL += "sad";
            } 
            const response = await axios.get(baseURL);
            setNumVideos(response.data.videos.length);
            setVideos(response.data.videos);
            
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Grid container spacing={10} columns={{ xs: 4, sm: 8, md: 12 }}>
            {videosList(numVideos, videos)}
        </Grid>
    );
}



export default HomePageGrid;