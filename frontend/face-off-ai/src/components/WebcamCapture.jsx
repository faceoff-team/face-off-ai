import React, { Component, useState, useEffect } from 'react';
//TODO this seems to have been included in a local production. The file does not
//exist to run on the server.
// import './cameraStyles.css'
import Webcam from "react-webcam";
const axios = require('axios')

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
    width: '300',
    height: '200',
};

const emotions = {
    "Fear": 0,
    "Happy": 1,
    "Sad": 2,
    "Neutral": 3
};

const WebcamCapture = ({running, setRunning, setLossTime, emotion}) => {
    const webcamRef = React.useRef(null);
    let elapsed = 0;

    
    
    React.useEffect(() => {
        console.log(running);
        console.log(emotion);
        if (running) {
            const interval = setInterval(() => {
                if (running) {
                    console.log(running);
                    let imageSrc = webcamRef.current.getScreenshot();
                    imageSrc = imageSrc.substring(imageSrc.indexOf(",") + 1);
                    //TODO: process image, send information back to game
                    let currentElapsed = elapsed;
                    console.log(`current elapsed time: ${currentElapsed}`);
                    elapsed++;
                    axios.post('https://ai.faceoff.cf/predict', {
                        image: imageSrc
                    })
                    .then((res) => {
                        console.log(res)
                        if (res.data.success == 'true') {
                            let conf = parseFloat(res.data.confidence);
                            console.log(emotions["happy"])
                            console.log(res.data.prediction);
                            console.log(typeof(conf));
                            if (emotions[res.data.prediction]== emotion && conf >= 0.7) {
                                setLossTime(currentElapsed);
                                console.log("loss detected")
                                setRunning(false);
                                return;
                                
                            }
                        }
                        console.log(res.data);
                    }, (err) => {
                        console.log(err);
                    })
                }

            }, 1000)
            return () => clearInterval(interval);

        }
        

        
    }, [running])
    return (
        <div className="webcam-container">
        <Webcam
            height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            videoConstraints={videoConstraints}
            mirrored
        />
        </div>
    )
}

export default WebcamCapture;