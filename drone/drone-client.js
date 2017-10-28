
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
drone.on('disconnected', () => {
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
    console.log('land command received');
    if (isConnected) {
        console.log('landing initiated');
        drone.land();
    } else {
        console.log('landing failed: drone not connected');
    }
});

socket.on('flipLeft', function (data) {
    console.log('flipLeft command received');
    if (isConnected) {
        console.log('flipLeft initiated');
        drone.animate('flipLeft');
    } else {
        console.log('flipLeft failed: drone not connected');
    }
});

socket.on('flipRight', function (data) {
    console.log('flipRight command received');
    if (isConnected) {
        console.log('flipRight initiated');
        drone.animate('flipRight');
    } else {
        console.log('flipRight failed: drone not connected');
    }
});

socket.on('flipFront', function (data) {
    console.log('flipFront command received');
    if (isConnected) {
        console.log('flipFront initiated');
        drone.animate('flipFront');
    } else {
        console.log('flipFront failed: drone not connected');
    }
});

socket.on('flipBack', function (data) {
    console.log('flipBack command received');
    if (isConnected) {
        console.log('flipBack initiated');
        drone.animate('flipBack');
    } else {
        console.log('flipBack failed: drone not connected');
    }
});

socket.on('forward', function (data) {
    const flightParams = {
        yaw: 0,
        pitch: 5,
        roll: 0,
        altitude: 0,
    };

    drone.setFlightParams(flightParams);
    timeout = setTimeout(() => {
        drone.setFlightParams({
            yaw: 0,
            pitch: 0,
            roll: 0,
            altitude: 0,
        });
    }, 100);
});

socket.on('backward', function (data) {
    const flightParams = {
        yaw: 0,
        pitch: -10,
        roll: 0,
        altitude: 0,
    };

    drone.setFlightParams(flightParams);
    timeout = setTimeout(() => {
        drone.setFlightParams({
            yaw: 0,
            pitch: 0,
            roll: 0,
            altitude: 0,
        });
    }, 100);
});
