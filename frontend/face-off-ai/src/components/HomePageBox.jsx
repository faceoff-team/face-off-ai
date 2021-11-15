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


    return (
        <Link to={`game/${videoID}/${videoTitle}`}>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <Card sx={{ maxWidth: 345, backgroundColor: "#414246", color: "white", 
                    '&:hover': {
                        backgroundColor: "#3a3b3f",
                        color: "#4cc0ad"
                    }}}
                    >
                    <CardActionArea>
                        <CardContent>
                            <p class="text-medium">{videoTitle}</p>
                        </CardContent>
                        <CardMedia
                            component="img"
                            height="140"
                            image={thumbnailURL}
                            alt={videoTitle}
                        />
                    </CardActionArea>
                </Card>
            </div>
        </Link>
    );
}

export default HomePageBox;