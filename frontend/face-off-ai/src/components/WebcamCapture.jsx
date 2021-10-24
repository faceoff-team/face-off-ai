import React, { Component, useState, useEffect } from 'react';
import './cameraStyles.css'
import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
    width='300',
    height='200',
}

const WebcamCapture = ({running}) => {
    const webcamRef = React.useRef(null);
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (running) {
                const imageSrc = webcamRef.current.getScreenshot();
                //TODO: process image, send information back to game
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