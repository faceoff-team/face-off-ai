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

const WebcamCapture = ({running, stateChanger}) => {
    const webcamRef = React.useRef(null);
    
    React.useEffect(() => {
        console.log("entered effect")
        const interval = setInterval(() => {
            console.log(running);
            let imageSrc = webcamRef.current.getScreenshot({width: 150, height: 100});
            imageSrc = imageSrc.substring(imageSrc.indexOf(",") + 1);
            console.log("type of image src: ".concat(typeof(imageSrc)))
            console.log("image.src: ".concat(imageSrc));
            //TODO: process image, send information back to game
            axios.post('https://ai.faceoff.cf/predict', {
                image: imageSrc
            })
            .then((res) => {
                // if (res.success == 'true') {
                //     console.log(res.prediction);
                //     if (res.prediction == 'happy') {
                //         stateChanger(true);
                //     }
                // }
                console.log(res.data);
            }, (err) => {
                console.log(err);
            })
            if (running) {
                
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