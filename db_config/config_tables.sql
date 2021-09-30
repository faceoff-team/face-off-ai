--Nic Ballesteros
--Ashton Statz

--Dropping Tables

DROP TABLE IF EXISTS user CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS user_game CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS game CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS challenge CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS video CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS leaderboard CASCADE CONSTRAINTS;

--Creating Tables

CREATE TABLE user (
    userID              INT(10) NOT NULL AUTO_INCREMENT,
    username            VARCHAR2(255) NOT NULL,
    password            VARCHAR2(64) NOT NULL,
    
);

ALTER TABLE user ADD CONSTRAINT user_pk PRIMARY KEY ( userID );

CREATE TABLE game (
    gameID              INT(10) NOT NULL AUTO_INCREMENT,
    winnerSore          NUMBER(10, 0),
    gameDate            DATETIME
);