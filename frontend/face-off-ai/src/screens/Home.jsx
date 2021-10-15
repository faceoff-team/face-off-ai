import React from "react";
import HomePageGrid from "../components/HomePageGrid.jsx";
import Button from "@mui/material/Button";
import { Link, withRouter } from 'react-router-dom';

function Home() {
    return (
        <div className="home" class="container">
            <h1 class="font-weight-heavy" style={{ marginTop: "20px" }}>Welcome! Want to jump right in? Click Below:</h1>
            <Link to="/game">
            <Button 
                size="large" 
                variant="contained" 
                color="secondary"
            >
                Join Game
            </Button></Link>
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Popular Today</h1>
            <HomePageGrid />
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Sad Videos</h1>
            <HomePageGrid />
        </div>
    );
}

export default withRouter(Home);