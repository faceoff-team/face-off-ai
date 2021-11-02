import React, { Component, useState, useEffect } from 'react';
import './cameraStyles.css'
import Webcam from "react-webcam";
const axios = require('axios')

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
    width='300',
    height='200',
}

const WebcamCapture = ({running, stateChanger}) => {
    const webcamRef = React.useRef(null);
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (running) {
                const imageSrc = webcamRef.current.getScreenshot();
                //TODO: process image, send information back to game
                axios.post('https://139.177.201.12:5000/predict', {
                    image: imageSrc
                })
                .then((res) => {
                    if (res.success == 'true') {
                        if (res.prediction == 'happy') {
                            stateChanger(true);
                        }
                    }
                }, (err) => {
                    console.log(err);
                })
            }
        }, 2000)
        return () => clearInterval(interval);

        
    }, [])
    return (
        <div className="webcam-container">
        <Webcam
            height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            videoConstraints={videoConstraints}
            audio
            mirrored
        />
        </div>
    )
}

export default WebcamCapture;