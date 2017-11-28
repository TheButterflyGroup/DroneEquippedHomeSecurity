
// Drone
const Drone = require('./Drone');

const MAX_ALTITUDE = 4;

const drone = new Drone({
    autoconnect: true,
    maxAltitude: MAX_ALTITUDE,

});

// drone connection
var isConnected = false;

// on drone connected
drone.on('disconnected', () => {
    console.log('drone disconnected');
    isConnected = false;
});



// socket.io
var io = require('socket.io-client');
var socket = io.connect('http://localhost:5000/?token=butterfly',
    { path: '/drone' });

// on socket connection
socket.on('connect', function () {
    console.log('socket.id:', socket.id);
    isConnected = true;
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
        if (drone.isFlying()) {
            console.log('landing initiated');
            drone.land();
        } else {
            console.log('landing failed: drone is not flying');
        }
    } else {
        console.log('landing failed: drone not connected');
    }
});

// pitch up
socket.on('pitchup', function (data) {
    if (isConnected) {
        if (drone.isFlying()) {

            const flightParams = {
                yaw: 0,
                pitch: data.value,
                roll: 0,
                altitude: 0,
            };

            drone.setFlightParams(flightParams);
            setTimeout(() => {
                drone.setFlightParams({
                    yaw: 0,
                    pitch: 0,
                    roll: 0,
                    altitude: 0,
                });
            }, 400);
        } else {
            console.log('pitch up failed: drone is not flying');
        }
    } else {
        console.log('pitch up failed: drone not connected');
    }

});

// pitch down
socket.on('pitchdown', function (data) {
    if (isConnected) {
        if (drone.isFlying()) {
            const flightParams = {
                yaw: 0,
                pitch: -data.value,
                roll: 0,
                altitude: 0,
            };

            drone.setFlightParams(flightParams);
            setTimeout(() => {
                drone.setFlightParams({
                    yaw: 0,
                    pitch: 0,
                    roll: 0,
                    altitude: 0,
                });
            }, 400);
        } else {
            console.log('pitch down failed: drone is not flying');
        }
    } else {
        console.log('pitch down failed: drone not connected');
    }
});

// roll left
socket.on('rollleft', function (data) {
    if (isConnected) {
        if (drone.isFlying()) {
            const flightParams = {
                yaw: 0,
                pitch: 0,
                roll: -data.value,
                altitude: 0,
            };

            drone.setFlightParams(flightParams);
            setTimeout(() => {
                drone.setFlightParams({
                    yaw: 0,
                    pitch: 0,
                    roll: -data.value,
                    altitude: 0,
                });
            }, 400);
        } else {
            console.log('roll left failed: drone is not flying');
        }
    } else {
        console.log('roll left failed: drone not connected');
    }
});

// roll right
socket.on('rollright', function (data) {
    if (isConnected) {
        if (drone.isFlying()) {
            const flightParams = {
                yaw: 0,
                pitch: data.value,
                roll: 0,
                altitude: 0,
            };

            drone.setFlightParams(flightParams);
            setTimeout(() => {
                drone.setFlightParams({
                    yaw: 0,
                    pitch: 0,
                    roll: 0,
                    altitude: 0,
                });
            }, 400);
        } else {
            console.log('roll right failed: drone is not flying');
        }
    } else {
        console.log('roll right failed: drone not connected');
    }
});

// yaw left
socket.on('yawleft', function (data) {
    if (isConnected) {
        if (drone.isFlying()) {
            const flightParams = {
                yaw: -data.value,
                pitch: 0,
                roll: 0,
                altitude: 0,
            };

            drone.setFlightParams(flightParams);
            setTimeout(() => {
                drone.setFlightParams({
                    yaw: -data.value,
                    pitch: 0,
                    roll: 0,
                    altitude: 0,
                });
            }, 400);
        } else {
            console.log('yaw left failed: drone is not flying');
        }
    } else {
        console.log('yaw left failed: drone not connected');
    }
});

// yaw right
socket.on('yawright', function (data) {
    if (isConnected) {
        if (drone.isFlying()) {
            const flightParams = {
                yaw: data.value,
                pitch: 0,
                roll: 0,
                altitude: 0,
            };

            drone.setFlightParams(flightParams);
            setTimeout(() => {
                drone.setFlightParams({
                    yaw: 0,
                    pitch: 0,
                    roll: 0,
                    altitude: 0,
                });
            }, 400);
        } else {
            console.log('yaw right failed: drone is not flying');
        }
    } else {
        console.log('yaw right failed: drone not connected');
    }
});


// flip left
socket.on('flipLeft', function (data) {
    console.log('flipLeft command received');
    if (isConnected) {
        console.log('flipLeft initiated');
        drone.animate('flipLeft');
    } else {
        console.log('flipLeft failed: drone not connected');
    }
});

// flip right
socket.on('flipRight', function (data) {
    console.log('flipRight command received');
    if (isConnected) {
        console.log('flipRight initiated');
        drone.animate('flipRight');
    } else {
        console.log('flipRight failed: drone not connected');
    }
});


// flip front
socket.on('flipFront', function (data) {
    console.log('flipFront command received');
    if (isConnected) {
        console.log('flipFront initiated');
        drone.animate('flipFront');
    } else {
        console.log('flipFront failed: drone not connected');
    }
});


// flip back
socket.on('flipBack', function (data) {
    console.log('flipBack command received');
    if (isConnected) {
        console.log('flipBack initiated');
        drone.animate('flipBack');
    } else {
        console.log('flipBack failed: drone not connected');
    }
});
