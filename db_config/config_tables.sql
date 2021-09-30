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
DROP TABLE IF EXISTS leaderboard;

-- Creating Tables

CREATE TABLE user (
    userID              INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username            VARCHAR2(255) NOT NULL,
    password            VARCHAR2(64) NOT NULL
);

CREATE TABLE game (
    gameID              INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    winnerSore          NUMBER(10, 0),
    gameDate            DATE
);