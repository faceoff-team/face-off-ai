import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from '@mui/material/Grid';
import HomePageBox from "./HomePageBox.jsx";

function videosList(numVideos, videos) {
    const videoList = [];
    if (numVideos > 6) {
        numVideos = 6;
    } else if (numVideos == 0) {
        videoList.push(<Grid item xs={8} >
            <div>There are no videos to display.</div>
                             </Grid>)
    }

    for (var i = 0; i < numVideos; i++) {
        videoList.push(<Grid item xs={2} sm={4} md={4} key={i}>
            <HomePageBox videoID={videos[i].videoYoutubeID}
                         videoTitle={videos[i].videoTitle}
                        />
                        </Grid>)
    }
    return videoList;
}

function HomePageGrid({emotionID}) {

    if (emotionID === 1) {
        // This is a try not to laugh video set
    } else if (emotionID === 2) {
        // This is a try not to cry video set
    }

    const [videos, setVideos] = useState(0);
    const [numVideos, setNumVideos] = useState(0);

    useEffect(() => {
        getVideoAPI();
    }, []);

    const getVideoAPI = async() => {
        try {

            const response = await axios.get("https://ai.faceoff.cf/api/user/leaderboard");
            setVideos(response.data.videos);
            setNumVideos(response.data.videos.length);
            
        } catch (err) {
            console.error(err);
        }
    };

    /*let history = useHistory();*/

    /*const redirect = () => {
      history.push('/game')
    }*/

    return (
        <Grid container Spacing={10} columns={{ xs: 4, sm: 8, md: 12 }}>
            {videosList(numVideos, videos)}
        </Grid>
    );
}



export default HomePageGrid;