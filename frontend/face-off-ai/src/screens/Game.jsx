import React from "react";
import ReactPlayer from "react-player";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';

//get url and title for parameter and API
function Game() {

    //for testing sake
    var url = "https://www.youtube.com/watch?v=YqaacQc6sho";
    var title = "Try Not to Laugh"

    let history = useHistory();

    const redirect = () => {
      history.push('/home')
    }

    return (
        <div className="gamePage" class="container">
            <div class="backButtonContainer" style={{marginTop: "20px"}}>
                <Button color="secondary" size="medium" startIcon={<ArrowBackIcon />} onClick={redirect}>
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
                    />
                </div>
            </div>
        </div>
    );
}

export default Game;