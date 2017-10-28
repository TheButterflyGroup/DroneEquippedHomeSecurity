module.exports = function (io, socketId) {
    // drone animation 
    setTimeout(function () {
        console.log('drone takeoff command sent');
        io.to(socketId).emit('takeoff');
    }, 5000);


    setTimeout(function () {
        console.log('drone pitch up command sent');
        io.to(socketId).emit('pitchup', { value: 7 });
    }, 7000);

    setTimeout(function () {
        console.log('drone row left command sent');
        io.to(socketId).emit('rowleft', { value: 5 });
    }, 8000);

    setTimeout(function () {
        console.log('drone row right command sent');
        io.to(socketId).emit('rowright', { value: 10 });
    }, 10000);

    setTimeout(function () {
        console.log('drone row left command sent');
        io.to(socketId).emit('rowleft', { value: 5 });
    }, 12000);

    setTimeout(function () {
        console.log('drone pitch down command sent');
        io.to(socketId).emit('pitchdown', { value: 7 });
    }, 15000);

    setTimeout(function () {
        console.log('drone land command sent');
        io.to(socketId).emit('land');
    }, 17000);
}