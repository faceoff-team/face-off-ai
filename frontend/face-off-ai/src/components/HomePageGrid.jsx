import React from "react";
import Grid from '@mui/material/Grid';
import HomePageBox from "./HomePageBox.jsx";

function HomePageGrid() {
    return (
        <Grid container Spacing={10} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <HomePageBox />
                </Grid>
            ))}
        </Grid>
    );
}



export default HomePageGrid;