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

function mapStateToProps(state) {
  return {
    socket: state.socket,
    socketio: state.socketio,
    test: state.test
  };
}

function mapDispatchToProps(dispatch) {
  return { 
    getSocket: () => dispatch(getSocket()), 
    getSocketio: () => dispatch(getSocketIO()), 
    testing: data => dispatch(testFunc(data)) };
}

function mapDispatchToPropsNew(dispatch) {
  return { 
    getSocket: () => dispatch(getSocketRaw()), 
    getSocketio: () => dispatch(getSocketIORaw()), 
    testing: data => dispatch(testFunc(data)) };
}

function mapDispatchToPropsTest1(dispatch) {
  return { 
    getSocket: () => socket.get(getSocket()), 
    getSocketio: () => socket.get(getSocketIO()), 
    testing: data => socket.get(testFunc(data)) };
}

function mapDispatchToPropsTest2(dispatch) {
  return { 
    getSocket: () => socket.context(getSocketRaw()), 
    getSocketio: () => socket.context(getSocketIORaw()), 
    testing: data => socket.context(testFunc(data)) };
}

}) */