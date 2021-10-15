import React from "react";
import ReactPlayer from "react-player";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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

    const statsCard = (
        <React.Fragment>
          <CardContent>
            <h1 class="font-weight-heavy" color="secondary">Stats</h1>
            <h4 class="font-weight-heavy" color="secondary">Top Score: </h4>
            <h4 class="font-weight-heavy" color="secondary">Average Score: </h4>
            <h4 class="font-weight-heavy" color="secondary">Friends Score: </h4>
          </CardContent>
        </React.Fragment>
    );

    const accessCard = (
        <React.Fragment>
          <CardContent>
            <h2 class="font-weight-heavy" color="secondary">Oh no...</h2>
            <h4 class="font-weight-heavy" color="secondary">Camera and/or Audio not found :(</h4>
            <h6 class="font-weight-heavy" color="secondary">Please connect a webcam and microphone</h6>
            <h6 class="font-weight-heavy" color="secondary">If you already have a webcam and microphone, please refresh and allow access</h6>
          </CardContent>
        </React.Fragment>
    );

    const [open, setOpen] = React.useState(false);
    let history = useHistory();

    const redirect = () => {
      history.push('/home')
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    navigator.mediaDevices.getUserMedia({ audio: true, video: true},function (stream) {
        if(stream.getVideoTracks().length > 0 && stream.getAudioTracks().length > 0){
            //code for when none of the devices are available
            console.log("nvm");             
        } else {
            // code for when both devices are available
            console.log("we have da deets");             
        }
    });

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
                <Button size="medium" onClick={redirect}>
                    YES!!
                </Button>
                <Button size="medium" onClick={handleClose}>
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
                    
                    <Box sx={{ minWidth: 200, leftPadding: "10px" }}>
                        <Card variant="outlined" >{accessCard}</Card>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Game;