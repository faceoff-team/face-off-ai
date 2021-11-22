import { React, useState } from "react";
import HomePageGrid from "../components/HomePageGrid.jsx";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HorizontalLine from "../components/HorizontalLine.jsx";
import TextField from '@mui/material/TextField';
import { Link, withRouter } from 'react-router-dom';

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
    const [multiCode, setMultiCode] = useState("");
    const [openWrongURL, setWrongURL] = useState(false);
    const [openNewGame, setNewGame] = useState(false);
    const [openWrongMulti, setWrongMulti] = useState(false);
    const [videoID, setVideoID] = useState("");
    const [videoTitle, setVideoTitle] = useState("");


    const updateID = (ID) => setVideoID(ID);
    const updateTitle = (title) => setVideoTitle(title);

    const handleOpenWrongURL = () => setWrongURL(true);
    const handleCloseWrongURL = () => setWrongURL(false);

    const handleOpenWrongMulti = () => setWrongMulti(true);
    const handleCloseWrongMulti = () => setWrongMulti(false);

    const handleOpenNewGame = () => setNewGame(true);
    const handleCloseNewGame = () => setNewGame(false);

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleCodeChange = (event) => {
        setMultiCode(event.target.value)
    }

    const handleSubmit = (e) => {
        if (value.match(ytRegex) != null) {
          console.log(value)
          handleCloseWrongURL();

          var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
          var match = value.match(regExp);
          updateID(match[7]);
          updateTitle("My First Video");
          handleOpenNewGame();
        } else {
            console.log("Does not match " + value)
            handleOpenWrongURL();
        }
    }

    const handleCodeSubmit = (e) => {
        if (value.match(codeRegex) == null) {
            handleOpenWrongMulti();
        }
    }

    const ytRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    const codeRegex = /[0-9]{6}/

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
                    style={{ width: "75%"}}
                    value={value}
                    onChange={handleChange}
                    error={(value.length > 0 && value.match(ytRegex) == null)}
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
            <h1 class="font-weight-heavy" style={{ marginTop: "20px" }}>Or paste in a multiplayer code:</h1>

            <HorizontalLine color="#f7f7f7" width="100%"/>
            <br/>
            <div class="searchContainer">
                <TextField
                    id="outlined-basic"
                    label="Paste code here"
                    variant="outlined"
                    color="secondary"
                    style={{ width: "25%"}}
                    value={multiCode}
                    onChange={handleCodeChange}
                    error={(multiCode.length < 0 || multiCode.match(codeRegex) == null)}
                />
                <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    style={{ height: "50px", marginLeft: "30px"}}
                    onClick={() => { handleCodeSubmit(); }}
                >
                    Play
                </Button>
            </div>
            <br/>
            <div style={{marginTop: "20px"}}></div>
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Popular Funny Videos</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <HomePageGrid emotionID="1"/>
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Sad Videos</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <HomePageGrid emotionID="2"/>
        </div>
    );
}

export default withRouter(Home);