import React from "react";
import Grid from "@material-ui/core/Grid";
import HomePageBox from "./HomePageBox.jsx";

function HomePageGrid() {
    return (
        <div class="container">
            <Grid container Spacing={10} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <HomePageBox />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}



export default HomePageGrid;