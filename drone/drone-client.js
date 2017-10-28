
// Drone
const Drone = require('./Drone');

const MAX_ALTITUDE = 6;

const drone = new Drone({
    autoconnect: true,
    maxAltitude: MAX_ALTITUDE,

});

// drone connection
var isConnected = false;

// on drone connected
drone.onDisconnect(() => {
    console.log('drone disconnected');
    isConnected = true;
});

// on drone disconnected
drone.on('connected', () => {
    console.log('drone connected');
    isConnected = true;
});

// socket.io
var io = require('socket.io-client');
var socket = io.connect('http://localhost:5000/?token=butterfly',
    { path: '/drone' });

// on socket connection
socket.on('connect', function () {
    console.log('socket.id:', socket.id);
});

// takeoff commande
socket.on('takeoff', function (data) {
    console.log('takeoff command recieved');

    if (isConnected) {
        console.log('takeoff initiated');
        drone.takeOff();
    } else {
        console.log('takeoff failed: drone not connected');

    }
});

// land command
socket.on('land', function (data) {
    console.log('landing command received');
    if (isConnected) {
        console.log('landing initiated');
        drone.land();
    } else {
        console.log('landing failed: drone not connected');
    }
});

socket.on('animate', function (data) {

});
