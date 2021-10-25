import React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
  } from "react-router-dom";

function HomePageBox({videoID, videoTitle}) {
    const videoURL = `https://www.youtube.com/watch?v=${videoID}`;
    const thumbnailURL = `http://img.youtube.com/vi/${videoID}/hqdefault.jpg`
    console.log(thumbnailURL);

    return (
        <Link to={`game/${videoID}/${videoTitle}`}>
            <div style={{margin: '20px'}}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardContent>
                            <h5>{videoTitle}</h5>
                        </CardContent>
                        <CardMedia
                            component="img"
                            height="140"
                            image={thumbnailURL}
                            alt="green iguana"
                        />
                    </CardActionArea>
                </Card>
            </div>
        </Link>
    );
}

export default HomePageBox;