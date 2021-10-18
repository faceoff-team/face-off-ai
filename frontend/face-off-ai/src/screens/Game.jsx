import React from "react";
import ReactPlayer from "react-player";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';

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

//get url and title for parameter and API
function Game() {

    //for testing sake
    var url = "https://www.youtube.com/watch?v=YqaacQc6sho";
    var title = "Try Not to Laugh"

    const [open, setOpen] = React.useState(false);
    let history = useHistory();

    const redirect = () => {
      history.push('/home')
    }

    const neutralizeBack = (callback) => {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
          window.history.pushState(null, "", window.location.href);
          callback();
        };
    };

    const revivalBack = () => {
        window.onpopstate = undefined;
        window.history.back();
    };

    const handleOpen = () => {
        setOpen(true);
        this.setState(() => neutralizeBack(this.handleClose));
    };
    const handleClose = () => {
        setOpen(false);
        this.setState(revivalBack);
    };

    return (
        <div className="gamePage" class="container">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to Quit?
                </Typography>
                <Button size="medium" color="secondary" onClick={redirect}>
                    YES!!
                </Button>
                <Button size="medium" color="secondary" onClick={handleClose}>
                    NO :)
                </Button>
                </Box>
            </Modal>
            <div class="backButtonContainer" style={{marginTop: "20px"}}>
                <Button color="secondary" size="medium" startIcon={<ArrowBackIcon />} onClick={handleOpen}>
                    Back
                </Button>
            </div>
            <h1 class="font-weight-heavy" style={{marginTop: "10px"}}>{title}</h1>
            <div className="game" class="gameRow">
                <div className="game" class="gameColumn">   
                    <ReactPlayer class="react-player"
                        width={"750px"}
                        height={"400px"}
                        className="videoFrame"
                        url={url}
                        light={true}
                        controls
                        muted
                        config={{
                            youtube: {
                                playerVars: { showinfo: 1 }
                            }
                        }}
                    />
                </div>
                <div className="game" class="gameColumn">
                    <Webcam
                        width='300'
                        height='200'
                        audio
                        mirrored
                    />
                </div>
            </div>
        </div>
    );
}

export default Game;