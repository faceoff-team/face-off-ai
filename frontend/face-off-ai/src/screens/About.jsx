import React from "react";
import Grid from '@mui/material/Grid';
import Purdue from "../assets/purdue.jpg";

function About() {
    return (
        <div className="about">
            <div class="container">
                <div class="basic-container">
                    <Grid container spacing={2}
                    alignItems="center"
                    justifyContent="center">
                        <Grid item xs={8}>
                            <h1 class="font-weight-heavy">About</h1>
                            <p class="about-desc">
                                FACEEOFF AI is a machine learning powered game designed to test a player's
                                emotional fortitude. React to your own Youtube video, or select from our list
                                of challenging content. Our specially-trained AI model has been painstakingly 
                                created to determine the emotion a person is feeling simply by observing their face. 
                                Face off with your friends to find out who can not laugh the longest!
                            </p>
                            <p class="about-desc">
                                This project was created by Nic Ballesteros, Dominic Miller, Sripranav Potturu, and Ashton Statz
                                for CS 30700: Software Engineering I at Purdue University, Fall semester 2021.
                            </p>
                        </Grid>
                        <Grid item xs={4}>
                            <img src={Purdue} width="100%" />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default About;