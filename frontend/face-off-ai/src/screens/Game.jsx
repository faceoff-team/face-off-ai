import React, { useCallback, useEffect } from "react";
import ReactPlayer from "react-player";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory, useParams } from 'react-router-dom';
import WebcamCapture from '../components/WebcamCapture';
import IconButton from '@mui/material/IconButton';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { http } from '../store';
import store from '../store'

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
    const { id, title, gameID } = useParams();

    const avgTimeDict = {"r9SsqcT6heE" : "50 seconds", "YqaacQc6sho" : "1 minute 3 seconds"};
    const bestTimeDict = {"r9SsqcT6heE" : "2 minutes 10 seconds", "YqaacQc6sho" : "5 minutes 4 seconds"};
    const userLastTimeDict = {"r9SsqcT6heE" : "32 seconds", "YqaacQc6sho" : "48 seconds"};
    const userBestTimeDict = {"r9SsqcT6heE" : "1 minute 3 seconds", "YqaacQc6sho" : "2 minutes 17 seconds"};
    
    const avgTime = avgTimeDict[id] === undefined ? "N/A" : avgTimeDict[id];
    const bestTime = bestTimeDict[id] === undefined ? "N/A" : bestTimeDict[id];
    const userLastTime = userLastTimeDict[id] === undefined ? "N/A" : userLastTimeDict[id];
    const userBestTime = userBestTimeDict[id] === undefined ? "N/A" : userBestTimeDict[id];

    const [open, setOpen] = React.useState(false);
    const [openMode, setOpenMode] = React.useState(true);
    const [openMulti, setOpenMulti] = React.useState(false);
    const [rateVideo, setRateVideo] = React.useState(0);
    const [running, setRunning] = React.useState(false);
    const [time, setLossTime] = React.useState(0);
    

    let history = useHistory();

    if( id == null || title == null) {
        history.push('/error');
    }

    var url = `https://www.youtube.com/watch?v=${id}`;

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
    
    const handleRunning = useCallback(() => {
        if (running) {
            setRunning(false);
            handleLoss();
        }
        else {
            setRunning(true);
        }
    }, [])

    const handleLoss = async () => {
        const gameRes = await http.get(`/api/game/${gameID}`);
        let winnerScore = Math.max(gameRes.data.winnerScore, time * 10);
        let lowScore = Math.min(gameRes.data.lowScore, time * 10);
        try {
            const updateGame = await http.put(`api/game/${gameID}`, {
                high: winnerScore,
                low: lowScore
            });
        }
        catch (err) {
            console.error(err);
        }

        if (store.getState().auth.isAuthenticated) {
            const userGame = await http.post('api/score/create', {
                user: store.getState().auth.user.userid,
                game: gameID,
                score: time * 10
            })
        }
        

        
    }

    const revivalBack = () => {
        window.onpopstate = undefined;
        window.history.back();
    };

    window.onbeforeunload = function (evt) {
        var message = 'Are you sure you want to leave?';
        if (typeof evt == 'undefined') {
          evt = window.event;
        }
        if (evt) {
          evt.returnValue = message;
        }
        return message;
    }

    /*
    <!-- Trigger the modal with a button -->
    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>

    <!-- Modal -->
    <div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Modal Header</h4>
        </div>
        <div class="modal-body">
            <p>Some text in the modal.</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
        </div>

    </div>
    </div>
    */

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenMode = () => setOpenMode(true);
    const handleCloseMode = () => setOpenMode(false);

    const handleOpenMulti = () => setOpenMulti(true);
    const handleCloseMulti = () => setOpenMulti(false);

    const handleLikeVideo = () => {
        if (rateVideo === 1) {
            setRateVideo(0);
        } else {
            setRateVideo(1);
        }
    }
    const handleDislikeVideo = () => {
        if (rateVideo === -1) {
            setRateVideo(0);
        } else {
            setRateVideo(-1);
        }
    }

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
                    yes
                </Button>
                <Button size="medium" color="secondary" onClick={handleClose}>
                    no
                </Button>
                </Box>
            </Modal>
            <Modal
                open={openMode}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Which mode do you want to play?
                    </Typography>
                    <Button size="medium" color="secondary" onClick={handleCloseMode}>
                        Single Player
                    </Button>
                    <Button size="medium" color="secondary" onClick={() => {
                        handleCloseMode();
                        handleOpenMulti();
                    }}>
                        Multi Player
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openMulti}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Which multiplayer mode do you want to play?
                    </Typography>
                    <Button size="medium" color="secondary" onClick={handleCloseMulti}>
                        Single Device
                    </Button>
                    <Button size="medium" color="secondary" onClick={handleCloseMulti}>
                        Multi Device
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
                        onStart={handleRunning}
                        // onPlay={handleRunning}
                        // onPause={handleRunning}
                        onEnded={handleRunning}
                        playing={running}
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
                    <WebcamCapture
                        running={running}
                        setRunning={setRunning}
                        setLossTime={setLossTime}
                    />
                </div>
            </div>
            <br/>
            <div className="statsRow" class="gameRow">
                <Card style={{width: '50%', margin: "20px"}}>
                    <div className="stats" class="gameColumn" style={{marginLeft: '30px'}}>
                        <h2 class="font-weight-heavy" style={{marginTop: "10px"}}>Statistics</h2>
                        <h4 class="font-weight-normal" style={{marginTop: "10px"}}>{avgTime}</h4>
                        <h4 style={{marginTop: "10px"}}>Best time: {bestTime}</h4>
                        <h4 style={{marginTop: "10px"}}>Your last time: {userLastTime}</h4>
                        <h4 style={{marginTop: "10px"}}>Your best time: {userBestTime}</h4>
                    </div>
                </Card>
                <Card style={{width: '50%', margin: "20px"}}>
                    <div className="stats" class="gameColumn" style={{marginLeft: '30px'}}>
                        <h2 class="font-weight-heavy" style={{marginTop: "10px"}}>Ratings</h2>
                        <h4 class="font-weight-normal" style={{marginTop: "10px"}}>96% like this video!</h4>
                    </div>
                    <IconButton aria-label="like-video" size="large" onClick={() => handleLikeVideo()}>
                        {rateVideo === 1 &&
                            <ThumbUpAltIcon color="primary"/>
                        }
                        {(rateVideo !== 1) &&
                            <ThumbUpOffAltIcon/>
                        }
                    </IconButton>
                    <IconButton aria-label="dislike-video" size="large" onClick={() => handleDislikeVideo()}>
                        {rateVideo === -1 &&
                            <ThumbDownAltIcon color="primary"/>
                        }
                        {(rateVideo !== -1) &&
                            <ThumbDownOffAltIcon/>
                        }
                    </IconButton>
                </Card>
            </div>
        </div>
    );
}

export default Game;