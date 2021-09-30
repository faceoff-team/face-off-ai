--Nic Ballesteros
--Ashton Statz

--Dropping Tables

DROP TABLE user CASCADE CONSTRAINTS;
DROP TABLE user_game CASCADE CONSTRAINTS;
DROP TABLE game CASCADE CONSTRAINTS;
DROP TABLE challenge CASCADE CONSTRAINTS;
DROP TABLE video CASCADE CONSTRAINTS;
DROP TABLE leaderboard CASCADE CONSTRAINTS;

--Creating Tables

CREATE TABLE user (
    userID              INT(10) NOT NULL AUTO_INCREMENT,
    username            VARCHAR2(255) NOT NULL,
    password            VARCHAR2(64) NOT NULL,
    
);

ALTER TABLE user ADD CONSTRAINT user_pk PRIMARY KEY ( userID );