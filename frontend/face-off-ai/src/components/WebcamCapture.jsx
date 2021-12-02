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


const WebcamCapture = ({running, setRunning, setLossTime}) => {
    const webcamRef = React.useRef(null);
    let elapsed = 0;

    
    
    React.useEffect(() => {
        console.log(running);
        if (running) {
            const interval = setInterval(() => {
                if (running) {
                    console.log(running);
                    let imageSrc = webcamRef.current.getScreenshot();
                    imageSrc = imageSrc.substring(imageSrc.indexOf(",") + 1);
                    //TODO: process image, send information back to game
                    let currentElapsed = elapsed;
                    elapsed++;
                    axios.post('https://ai.faceoff.cf/predict', {
                        image: imageSrc
                    })
                    .then((res) => {
                        if (res.success == 'true') {
                            console.log(res.prediction);
                            console.log(res.confidence);
                            setLossTime(currentElapsed);
                            if (res.prediction == 'happy' && parseFloat(res.confidence) > 0.7) {
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