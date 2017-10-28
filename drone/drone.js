var io = require('socket.io-client');

var socket = io.connect('http://localhost:5000/?token=butterfly', { path: '/drone' });

socket.on('connect', function () {
    console.log('socket.id:', socket.id);
});

socket.on('takeoff', function (data) {
    console.log('drone taking off!');
});

socket.on('land', function (data) {
    console.log('drone landing....');
});