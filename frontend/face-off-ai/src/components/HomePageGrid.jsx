import React from "react";
import Grid from '@mui/material/Grid';
import HomePageBox from "./HomePageBox.jsx";
import Button from '@mui/material/Button';
//Trying to add button functionality to each HomePageBox
import { useHistory } from 'react-router-dom';

function HomePageGrid({videoID}) {

    let history = useHistory();

    const redirect = () => {
      history.push('/game')
    }

    return (
        <Grid container Spacing={10} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <HomePageBox videoID={videoID}/>
                </Grid>
            ))}
        </Grid>
    );
}



export default HomePageGrid;