import React from "react";

function About() {
    return (
        <div className="about">
            <div class="container">
                <div class="row align-items-center my-5">
                    <div class="col-lg-8">
                        <h1 class="font-weight-heavy">About</h1>
                        <p class="about-desc">
                            FACEEOFF AI is a machine learning powered game designed to test a player's
                            emotional fortitude. Our specially-trained AI model has been trained to determine
                            the emotion a person is feeling simply by observing their face. Face off with
                            your friends to find out who can not laugh the longest!
                        </p>
                        <p class="about-desc">
                            This project was created by Nic Ballesteros, Dominic Miller, Sripranav Potturu, and Ashton Statz
                            for CS 30700, Software Engineering I, at Purdue University.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;