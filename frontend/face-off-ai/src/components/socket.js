/* 

const express = require(‘express’) // Importing Express
const app = express() // Creating Express Server
const host = ‘localhost’ // Specifying Host
const port = 8000 // Specifying Port number// Creating Http Server from Express App to work with socket.io

const http = require(‘http’).Server(app);// Initializing socket.io object
const io = require(‘socket.io’)(http,{

 cors: {
 origin: “*”,
 }

 export function testFunc(data) {
  return (dispatch, getState) => {
    dispatch(test(data))
    console.log('GLOBAL STATE IS :', getState())
  };
}

}) */