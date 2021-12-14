# FACEOFF AI
An emotion recognition "try not to laugh" style online game. Play by yourself or challenge your friends to see who can resist the urge the longest. Players select a video and press play, and for as long as they do not express the emotion the video is intended to illicit, they gain points. As soon as a player smiles or laughs to a funny video, for example, the game is ended and their point total is displayed. Players can play with funny, sad, and scary videos.
<br><br>

<strong>AI Model Features</strong>
* Machine learning model trained using the FER 2013 dataset. We used Fear, Happy, Sad, and Neutral. The model analyzes facial expression and makes a prediction.
* CNN model created with Keras, 6 2D convolutional layers, 3 fully connected layers, softmax output.
* Hosted by a flask application with facial recognition, facial landmarking, and image transformation.

<strong>Other details</strong>
* Fully functioning backend, complete with mySQL database, API to interact with said database, complete with necessary docker containers
* Fully functioning React.js frontend, with profiles, leaderboards, gameplay pages, and more
<br><br>

<i>This project was created by Nic Ballesteros, Dom Miller, Sri Potturu, and Ashton Statz for CS 30700 at Purdue University, Fall Semester 2021</i>
