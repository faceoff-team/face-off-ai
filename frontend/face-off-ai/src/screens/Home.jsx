import React from "react";
import HomePageGrid from "../components/HomePageGrid.jsx";
import Button from "@mui/material/Button";
import HorizontalLine from "../components/HorizontalLine.jsx";
import { Link, withRouter } from 'react-router-dom';

function Home() {
    return (
        <div className="home" class="container">
            <h1 class="font-weight-heavy" style={{ marginTop: "20px" }}>Welcome! Want to jump right in? Click Below:</h1>
            <HorizontalLine color="#f7f7f7" width="100%"/>
            <div style={{textAlign: 'center'}}>
                <Link to="/game">
                <Button 
                    size="large" 
                    variant="contained" 
                    color="secondary"
                        style={{ fontSize: '18px', maxWidth: '14em', maxHeight: '4em', minWidth: '12em', minHeight: '3em' }}
                >
                    Singleplayer
                </Button></Link>
                <div style={{marginTop: "20px"}}></div>
                <Link to="/game">
                    <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        style={{ fontSize: '18px', maxWidth: '14em', maxHeight: '4em', minWidth: '12em', minHeight: '3em' }}
                    >
                        Play with friends
                    </Button></Link>
            </div><div style={{marginTop: "20px"}}></div>
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Popular Today</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <HomePageGrid videoID="YqaacQc6sho" videoTitle="Try Not To Laugh Vol 69"/>
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Sad Videos</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <HomePageGrid videoID="r9SsqcT6heE" videoTitle="Try Not To Cry Vol 69"/>
        </div>
    );
}

export default withRouter(Home);