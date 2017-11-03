var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var passport = require('./strategies/mongo.localstrategy');
var sessionConfig = require('./modules/session.config');

//DB Module
var db = require('./modules/db.config.js');

// socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http, { path: '/drone' });

// socket middleware
io.use((socket, next) => {
    let token = socket.handshake.query.token;
    if (token === 'butterfly') {
        socket.token = token;
        return next();
    }
    console.log('token rejected:', token);
    return next(new Error('authentication error'));
});

// establish socket connection
io.on('connection', function (socket) {

    socketId = socket.id;

    console.log('connected with id', socketId);
});

// function to animate drone params: io, socketId
var droneAnimate = require('./modules/drone');


var Particle = require('particle-api-js');
var particle = new Particle();
var token;
var DEVICE_ID = '51ff6e065082554928300887';

particle.login({ username: 'blackcj2@gmail.com', password: 'spark9684' }).then(
    function (data) {
        console.log('API call completed on promise resolve: ', data.body.access_token);
        token = data.body.access_token;

        // //Get all events
        particle.getEventStream({ auth: token, deviceId: DEVICE_ID }).then(function (stream) {
            stream.on('event', function (data) {
                console.log('getEventStream() Event: ', data);
                animateDrone();
            });
        });

    },
    function (err) {
        console.log('API call completed on promise fail: ', err);
    }
);

function animateDrone() {
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

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');
var securityRouter = require('./routes/security.router');

var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/security', securityRouter);

// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
http.listen(port, function () {
    console.log('Listening on port:', port);
});