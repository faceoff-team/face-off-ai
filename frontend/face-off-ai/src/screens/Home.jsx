import { React, useState } from "react";
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

    const [value, setValue] = useState("")

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSubmit = (e) => {
        if (value.match(ytRegex) != null) {
          console.log(value)
        } else {
            console.log("Does not match " + value)
        }
      }

    const ytRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    return (
        <div className="home" class="container">
            <h1 class="font-weight-heavy" style={{ marginTop: "20px" }}>Welcome! Paste in a YouTube video link or click a video below:</h1>
            <HorizontalLine color="#f7f7f7" width="100%"/>
            <br/>
                <form onSubmit={handleSubmit}>
            <div class="searchContainer">
                    <TextField
                        id="outlined-basic"
                        label="Paste link here"
                        variant="outlined"
                        color="secondary"
                        style={{ width: "75%" }}
                        value={value}
                        onChange={handleChange}
                        error={(value.match(ytRegex) == null)}
                    />
                    <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        style={{ height: "50px", marginLeft: "30px"}}
                        type="submit"
                    >
                        Search
                    </Button>
            </div>
                </form>
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