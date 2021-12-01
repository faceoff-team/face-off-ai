import React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { http } from '../store'
import { v4 as uuidv4 } from 'uuid';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
  } from "react-router-dom";

function HomePageBox({videoID, videoTitle, videoKey}) {
    const thumbnailURL = `http://img.youtube.com/vi/${videoID}/hqdefault.jpg`

    const handleClick = React.useCallback((videoKey) => {
        try {
            http.post('api/game/', {
                videoID: videoKey
            })
         }
         catch (err) {
             console.log(err);
         }
    });

    const gameID = uuidv4();

    return (
        <Link to={`game/${videoID}/${videoTitle}/${gameID}`} style={{textDecoration: 'none'}}>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <Card sx={{ maxWidth: 345, 
                            borderRadius: '10px',
                            backgroundColor: '#414246',
                            color: 'white', 
                            lineHeight: 1.25,
                    '&:hover': {
                        backgroundColor: '#3a3b3f',
                        color: '#4cc0ad'
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
                        onClick={() => handleClick(videoKey)}
                    </CardActionArea>
                </Card>
            </div>
        </Link>
    );
}

export default HomePageBox;