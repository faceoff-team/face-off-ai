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

DROP TABLE IF EXISTS user_game;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS friend;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS challenge;
DROP TABLE IF EXISTS video;
DROP TABLE IF EXISTS emotion;

-- Creating Tables

CREATE TABLE user (
    userID              INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username            VARCHAR(255) NOT NULL,
    hash                VARCHAR(128) NOT NULL,
    salt                VARCHAR(64) NOT NULL,
    email               VARCHAR(64),
    bio                 VARCHAR(256),
    -- TODO: define the method for accessing imagePath
    imagePath           VARCHAR(128),
    worldRank           INT(10) NOT NULL,
    -- Best all-time score ever recorded for this user
    bestScore           INT(10) NOT NULL,
    -- Worst performance for this user
    worstScore          INT(10) NOT NULL
);

CREATE TABLE game (
    gameID              INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    winnerSore          INT(10),
    lowScore            INT(10),
    gameDate            DATE
);

CREATE TABLE friend {
    FOREIGN KEY (user1) REFERENCES user(userID),
    FOREIGN KEY (user2) REFERENCES user(userID),
    friendDate          DATE,
    PRIMARY KEY (user1, user2)
}

CREATE TABLE challenge (
    challengeID         INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    challengeName       VARCHAR(255),
    difficulty          INT(10),
    averageRating       INT(10),
    highScore           INT(10)
);

CREATE TABLE emotion (
    emotionID           INT(1) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    emotionName         VARCHAR(64)
);

CREATE TABLE video (
    videoID             INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    videoURL            VARCHAR(255) NOT NULL,
    videoRank           INT(10),
    videoTitle          VARCHAR(255),
    FOREIGN KEY(emotionID) REFERENCES emotion(emotionID)        
);

CREATE TABLE user_game (
    user              INT NOT NULL,
    game              INT NOT NULL,
    finalScore        INT(10) NOT NULL,
    FOREIGN KEY (user) REFERENCES user(userID),
    FOREIGN KEY (game) REFERENCES game(gameID),
    PRIMARY KEY (user, game)
);
