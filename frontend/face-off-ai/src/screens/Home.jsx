import React from "react";
import HomePageGrid from "../components/HomePageGrid.jsx";
import Button from "@mui/material/Button";
import HorizontalLine from "../components/HorizontalLine.jsx";
import { Link, withRouter } from 'react-router-dom';
import { TextField } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Home() {
    const ytRegex = "^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$"
    return (
        <div className="home" class="container">
            <h1 class="font-weight-heavy" style={{ marginTop: "20px" }}>Welcome! Paste in a YouTube video link or click a video below:</h1>
            <HorizontalLine color="#f7f7f7" width="100%"/>
            <br/>
            <TextField
                inputProps={{ pattern: ytRegex }}
                id="outlined-basic"
                label="Paste a YouTube link here"
                variant="outlined"
                color="secondary"
                fullWidth
            />
            <br/>
            <div style={{marginTop: "20px"}}></div>
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