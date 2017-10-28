var io = require('socket.io-client');

var socket = io.connect('http://localhost:5000/socket.io?token=butterfly');

socket.on('connect', function () {
    console.log('socket.id:', socket.token);
});

socket.emit('message', 'hi server');