var isFlying = false;

var animate = function (io, socketId) {
  if(!isFlying) {
    isFlying = true;
    // drone animation
    setTimeout(function () {
      console.log('drone takeoff command sent');
      io.to(socketId).emit('takeoff');
    }, 50);


      // setTimeout(function () {
      //     console.log('drone pitch up command sent');
      //     io.to(socketId).emit('pitchup', { value: 7 });
      // }, 4000);

      // setTimeout(function () {
      //     console.log('drone row left command sent');
      //     io.to(socketId).emit('rowleft', { value: 5 });
      // }, 8000);
      //
      // setTimeout(function () {
      //     console.log('drone row right command sent');
      //     io.to(socketId).emit('rowright', { value: 10 });
      // }, 10000);
      //
      // setTimeout(function () {
      //     console.log('drone row left command sent');
      //     io.to(socketId).emit('rowleft', { value: 5 });
      // }, 12000);

      // setTimeout(function () {
      //     console.log('drone pitch down command sent');
      //     io.to(socketId).emit('pitchdown', { value: 7 });
      // }, 6000);

    setTimeout(function () {
      console.log('drone land command sent');
      io.to(socketId).emit('land');
    }, 6000);

    setTimeout(function () {
      isFlying = false;
    }, 7000);
  } else {
    console.log('already flying');
  }
}

module.exports = {
  animate: animate
}
