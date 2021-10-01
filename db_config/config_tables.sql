-- Nic Ballesteros
-- Ashton Statz

-- Choose faceoff database.

USE faceoff;

-- Dropping Tables

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_game;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS challenge;
DROP TABLE IF EXISTS video;
DROP TABLE IF EXISTS emotion;

-- Creating Tables

-- TODO: Add necessary relationship columns to each table, especially for user_game

CREATE TABLE user (
    userID              INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username            VARCHAR(255) NOT NULL,
    password            VARCHAR(64) NOT NULL,
    email               VARCHAR(64),
    image               LONGBLOB,
    worldRank           INT(10) NOT NULL,
    bestScore           INT(10) NOT NULL
);

CREATE TABLE game (
    gameID              INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    winnerSore          INT(10),
    gameDate            DATE
);

CREATE TABLE challenge (
    challengeID         INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    challengeName       VARCHAR(255),
    difficulty          INT(10),
    averageRating       INT(10),
    highScore           INT(10)
);

CREATE TABLE video (
    videoURL            VARCHAR(255) NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE emotion (
    emotionID           INT(1) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    emotionName         VARCHAR(64)
)