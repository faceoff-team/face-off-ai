/*
 * FACEOFF AI database
 * mySQL
 * Nic Ballesteros
 * Ashton Statz
 *
 */

-- Choose faceoff database.

USE faceoff;

-- Dropping Tables

SET FOREIGN_KEY_CHECKS = 0;
SET UNIQUE_CHECKS = 0;
DROP TABLE IF EXISTS user_game;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS friend;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS challenge;
DROP TABLE IF EXISTS video;
DROP TABLE IF EXISTS emotion;
DROP TABLE IF EXISTS reset_password;
SET UNIQUE_CHECKS = 1;
SET FOREIGN_KEY_CHECKS = 1;

-- Creating Tables

CREATE TABLE user (
    userID              INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username            VARCHAR(255) NOT NULL,
    hash                VARCHAR(128) NOT NULL,
    salt                VARCHAR(64) NOT NULL,
    email               VARCHAR(64),
    bio                 VARCHAR(256),
    -- Path to the user's profile page
    imagePath           VARCHAR(128),
    worldRank           INT(10) NOT NULL,
    -- Best all-time score ever recorded for this user
    bestScore           INT(10) NOT NULL,
    -- Worst performance for this user
    worstScore          INT(10) NOT NULL
);

CREATE TABLE friend (
    user1               INT(10) NOT NULL,
    user2               INT(10) NOT NULL,
    FOREIGN KEY (user1) REFERENCES user(userID),
    FOREIGN KEY (user2) REFERENCES user(userID),
    friendDate          DATE,
    PRIMARY KEY (user1, user2)
);

CREATE TABLE challenge (
    challengeID         INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    challengeName       VARCHAR(255),
    difficulty          INT(10),
    averageRating       INT(10),
    highScore           INT(10),
    videoID             INT(10),
    FOREIGN KEY (videoID) REFERENCES video(videoID)
);

CREATE TABLE emotion (
    emotionID           INT(1) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    emotionName         VARCHAR(64)
);

CREATE TABLE video (
    videoID             INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    videoYoutubeID      VARCHAR(255) NOT NULL,
    videoRank           INT(10) DEFAULT -1,
    videoTitle          VARCHAR(255),
    emotionID           INT(1) NOT NULL,
    FOREIGN KEY(emotionID) REFERENCES emotion(emotionID)        
);

CREATE TABLE game (
    gameID                  INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    videoID                 INT(10) NOT NULL,
    FOREIGN KEY (videoID)   REFERENCES video(videoID),
    winnerScore             INT(10) DEFAULT -1,
    lowScore                INT(10) DEFAULT 360000,
    gameDate                DATETIME DEFAULT NOW()
);

CREATE TABLE user_game (
    user              INT NOT NULL,
    game              INT NOT NULL,
    finalScore        INT(10) NOT NULL,
    FOREIGN KEY (user) REFERENCES user(userID),
    FOREIGN KEY (game) REFERENCES game(gameID),
    PRIMARY KEY (user, game)
);

CREATE TABLE reset_password (
    user              INT(10) NOT NULL,
    hash              VARCHAR(64) NOT NULL,
    expires           INT(15) NOT NULL,
    FOREIGN KEY (user) REFERENCES user(userID),
    PRIMARY KEY (user)
);

INSERT INTO emotion (emotionID, emotionName)
VALUES (1, "Happy");

INSERT INTO emotion (emotionID, emotionName)
VALUES (2, "Sad");

INSERT INTO emotion (emotionID, emotionName)
VALUES (3, "Funny");
