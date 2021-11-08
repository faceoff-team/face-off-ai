import { React, useState } from "react";
import HomePageGrid from "../components/HomePageGrid.jsx";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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

    const [value, setValue] = useState("");
    const [openWrongURL, setWrongURL] = useState(false);
    const [openNewGame, setNewGame] = useState(false);
    const [videoID, setVideoID] = useState("");
    const [videoTitle, setVideoTitle] = useState("");

    //let videoID = "";
    //let videoTitle = "";

    const updateID = (ID) => setVideoID(ID);
    const updateTitle = (title) => setVideoTitle(title);

    const handleOpenWrongURL = () => setWrongURL(true);
    const handleCloseWrongURL = () => setWrongURL(false);

    const handleOpenNewGame = () => setNewGame(true);
    const handleCloseNewGame = () => setNewGame(false);

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSubmit = (e) => {
        if (value.match(ytRegex) != null) {
          console.log(value)
          handleCloseWrongURL();

          var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
          var match = value.match(regExp);
          //const keys = value.match(idRegex);
          updateID(match[7]);
          updateTitle("My First Video");
          handleOpenNewGame();
        } else {
            console.log("Does not match " + value)
            handleOpenWrongURL();
        }
      }

    const ytRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    const idRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi

    const ytRegex1 = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    const idRegex1 = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi

    const ytRegex2 = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    const idRegex2 = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi
    return (
        <div className="home" class="container">
            <Modal
                open={openWrongURL}
                onClose={handleCloseWrongURL}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Invalid URL! Please try a new URL or select a popular game.
                </Typography>
                <Button size="medium" color="secondary" onClick={handleCloseWrongURL}>
                    Ok!
                </Button>
                </Box>
            </Modal>
            <Modal
                open={openNewGame}
                onClose={handleCloseNewGame}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Awesome! Do you want to play "{videoTitle}"?
                </Typography>
                <Link to={`game/${videoID}/${videoTitle}`}>
                    <Button size="medium" color="secondary" onClick={handleCloseNewGame}>
                        Go to game!
                    </Button>
                </Link>
                <Button size="medium" color="secondary" onClick={handleCloseNewGame}>
                    Cancel
                </Button>
                </Box>
            </Modal>
            <h1 class="font-weight-heavy" style={{ marginTop: "20px" }}>Welcome! Paste in a YouTube video link or click a video below:</h1>
            <HorizontalLine color="#f7f7f7" width="100%"/>
            <br/>
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
                    onClick={() => { handleSubmit(); }}
                >
                    Search
                </Button>
            </div>
            <br/>
            <div style={{marginTop: "20px"}}></div>
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Popular Today</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <HomePageGrid videoID="YqaacQc6sho" videoTitle="Try Not To Laugh Vol 69"/>
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Sad Videos</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <HomePageGrid videoID="r9SsqcT6heE" videoTitle="Try Not To Cry Vol 69"/>
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Sad Videos</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <HomePageGrid videoID="r9SsqcT6heE" videoTitle="Try Not To Cry Vol 69"/>
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Sad Videos</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <HomePageGrid videoID="r9SsqcT6heE" videoTitle="Try Not To Cry Vol 69"/>
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Sad Videos</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <HomePageGrid videoID="r9SsqcT6heE" videoTitle="Try Not To Cry Vol 69"/>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <HorizontalLine color="#f7f7f7" width="100%" />
            <HorizontalLine color="#f7f7f7" width="100%" />
        </div>
    );
}

export default withRouter(Home);