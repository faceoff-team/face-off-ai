import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Leaderboard from '@mui/icons-material/Leaderboard';
import { useHistory, useParams } from 'react-router-dom';
import WebcamCapture from '../components/WebcamCapture';
import IconButton from '@mui/material/IconButton';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { http } from '../store';
import store from '../store'
import axios from "axios";
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText';

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
//TODO: figure out how to parse emotions
function Game() {
    let emotion = 1;
    const { id, gameid } = useParams();
    const emoGetter = useEffect(async () => {
        const emo = await http.get(`/api/video/byID/${id}`);
        emotion = emo.data.video[0].emotionID;
        
        
    }, [])
    const [videoTitle, setVideoTitle] = useState(0);

    axios.get(`https://ai.faceoff.cf/api/video/byID/${id}`).then((response) => {
        console.log(response)
        setVideoTitle(response.data.video[0].videoTitle);
    });

    const avgTimeDict = {"r9SsqcT6heE" : "50 seconds", "YqaacQc6sho" : "1 minute 3 seconds"};
    const bestTimeDict = {"r9SsqcT6heE" : "2 minutes 10 seconds", "YqaacQc6sho" : "5 minutes 4 seconds"};
    const userLastTimeDict = {"r9SsqcT6heE" : "32 seconds", "YqaacQc6sho" : "48 seconds"};
    const userBestTimeDict = {"r9SsqcT6heE" : "1 minute 3 seconds", "YqaacQc6sho" : "2 minutes 17 seconds"};
    
    const avgTime = avgTimeDict[id] === undefined ? "N/A" : avgTimeDict[id];
    const bestTime = bestTimeDict[id] === undefined ? "N/A" : bestTimeDict[id];
    const userLastTime = userLastTimeDict[id] === undefined ? "N/A" : userLastTimeDict[id];
    const userBestTime = userBestTimeDict[id] === undefined ? "N/A" : userBestTimeDict[id];

    const [open, setOpen] = React.useState(false);
    const [openMode, setOpenMode] = React.useState(store.getState().auth.isAuthenticated);
    const [openMulti, setOpenMulti] = React.useState(false);
    const [rateVideo, setRateVideo] = React.useState(0);
    const [running, setRunning] = React.useState(false);
    const [lossState, setlossState] = React.useState(0);
    const [openLoss, setOpenLoss] = React.useState(false);
    const [guestInputName, setGuestName] = React.useState(store.getState().auth.isAuthenticated ? store.getState().auth.user.userid : "");
    const [openGuestName, setGuestNameMode] = React.useState(!store.getState().auth.isAuthenticated);
    const [openLeaderboard, setLeaderboard] = React.useState(false);
    let lossTime = 0;

    let history = useHistory();

    if( id == null || gameid == null) {
        history.push('/error');
    }

    var url = `https://www.youtube.com/watch?v=${id}`;

    const redirect = () => {
      history.push('/home')
    }

    const waitTime = async (time) => {
        lossTime = time
    }

    const waitTimeState = async (time) => {
        setlossState(time);
    }
    
    const handleRunning = () => {
        console.log(`handling running: current state: ${running}`);
        if (running) {
            setRunning(false);
            handleLoss();
        }
        else {
            setRunning(true);
        }
    }

    const handleLoss = async () => {
        await waitTimeState(lossTime);
        setOpenLoss(true);
        console.log(gameid)
        const gameRes = await http.get(`/api/game/${gameid}`);
        console.log(JSON.stringify(gameRes.data));
        console.log(gameRes.data.game[0].winnerScore);
        console.log(lossTime * 10);
        console.log(gameRes.data.game[0].lowScore);
        let winnerScore = Math.max(gameRes.data.game[0].winnerScore, lossTime * 10);
        let lowScore = Math.min(gameRes.data.game[0].lowScore, lossTime * 10);
        console.log(winnerScore);
        console.log(lowScore);
        try {
            const updateGame = await http.put(`/api/game/${gameid}`, {
                high: winnerScore,
                low: lowScore
            });
        }
        catch (err) {
            console.error(err);
        }

        if (store.getState().auth.isAuthenticated) {
            const gameKeyRes = await http.get(`/api/game/${gameid}`);
            console.log(JSON.stringify(gameKeyRes));
            const gameKey = gameKeyRes.data.game[0].gameID;
            console.log(`GAMEKEY: ${gameKey}`);
            const userGame = await http.post('api/score/create', {
                user: store.getState().auth.user.userid,
                game: gameKey,
                score: lossTime * 10
            }, {headers: {
                Authorization: store.getState().auth.token
            }})
            const userUpdate = await http.put('api/user/profile/scores', {
                id: store.getState().auth.user.userid,
                score: lossTime * 10
            }, {headers: {
                Authorization: store.getState().auth.token
            }});
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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenMode = () => setOpenMode(true);
    const handleCloseMode = () => setOpenMode(false);

    const handleOpenMulti = () => setOpenMulti(true);
    const handleCloseMulti = () => setOpenMulti(false);

    const handleOpenGuest = () => setGuestNameMode(true);
    const handleCloseGuest = () => setGuestNameMode(false);

    const handleOpenLeaderboard = () => setLeaderboard(true);
    const handleCloseLeaderboard = () => setLeaderboard(false);

    const handleNameChange = (event) => {
        setGuestName(event.target.value);
    }

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

    function generate(element) {
        return [0, 1, 2].map((value) =>
          React.cloneElement(element, {
            key: value,
          }),
        );
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
                    Yes
                </Button>
                <Button size="medium" color="secondary" onClick={handleClose}>
                    No
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
                    <Button size="medium" color="secondary" onClick={() => handleCloseMulti()}>
                        Multi Device
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openLeaderboard}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Game Leaderboard
                    </Typography>
                    <List>
                        {generate(
                            <ListItem>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <ListItemText
                                        primary="Single-line item"
                                    />
                                    <div style={{ textAlign: "right" }}>
                                        <ListItemText
                                            secondary="Score"
                                        />
                                    </div>
                                </div>
                            </ListItem>,
                        )}
                    </List>
                    <Button size="medium" color="secondary" onClick={() => handleCloseLeaderboard()}>
                        Close
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openGuestName}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Please enter a name (At least 2 characters)
                    </Typography>
                    <br/>
                    <TextField
                        id="outlined-basic"
                        label="Put your name here"
                        variant="outlined"
                        color="secondary"
                        style={{ width: "75%"}}
                        value={guestInputName}
                        onChange={(event) => handleNameChange(event)}
                        error={guestInputName.length < 2}
                    />
                    <Button size="medium" color="secondary" onClick={() => {
                        if (guestInputName.length >= 2) {
                            handleCloseGuest();
                            handleOpenMode();
                        }
                    }}>
                        Lets Go!
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openLoss}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Game Ended
                    </Typography>
                    <Typography id="modal-modal-description" variant="h7" component="h2">
                        You scored {10 * lossState} points!
                    </Typography>
                    <Button component={Link} to="/home" size="medium" color="secondary">
                        Return Home
                    </Button>
                </Box>
            </Modal>
            <div class="backButtonContainer" style={{marginTop: "20px"}}>
                <Button color="secondary" size="medium" startIcon={<ArrowBackIcon />} onClick={handleOpen}>
                    Back
                </Button>
            </div>
            <h1 class="font-weight-heavy" style={{marginTop: "10px"}}>{videoTitle}</h1>
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
                        handleRunning={handleRunning}
                        setLossTime={waitTime}
                        emotion={emotion}
                        time={lossTime}
                    />
                </div>
            </div>
            <br/>
            <div class="backButtonContainer" style={{marginTop: "20px"}}>
                <Button color="secondary" size="medium" startIcon={<Leaderboard />} onClick={() => handleOpenLeaderboard()}>
                    Leaderboard
                </Button>
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
                    <div style={{ width: '100%', justifyContent: "center", display: "flex" }}>
                        <IconButton aria-label="like-video" size="large" onClick={() => handleLikeVideo()}>
                            {rateVideo === 1 &&
                                <ThumbUpAltIcon color="primary" size="large"/>
                            }
                            {(rateVideo !== 1) &&
                                <ThumbUpOffAltIcon/>
                            }
                        </IconButton>
                        <IconButton aria-label="dislike-video" size="large" onClick={() => handleDislikeVideo()}>
                            {rateVideo === -1 &&
                                <ThumbDownAltIcon color="primary" size="large"/>
                            }
                            {(rateVideo !== -1) &&
                                <ThumbDownOffAltIcon/>
                            }
                        </IconButton>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Game;