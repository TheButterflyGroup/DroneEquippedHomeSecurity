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
    console.log('connected with id', socket.id);

    // 5 seconds
    setTimeout(function () {
        console.log('drone takeoff command sent');
        io.to(socket.id).emit('takeoff');
    }, 5000);

    // 10 seconds
    setTimeout(function () {
        console.log('drone forward command sent');
        io.to(socket.id).emit('forward');
    }, 10000);

    // 15 seconds
    setTimeout(function () {
        console.log('drone flipBack command sent');
        io.to(socket.id).emit('flipFront');
    }, 15000);

    // 20 seconds
    setTimeout(function () {
        console.log('drone flipLeft command sent');
        io.to(socket.id).emit('flipLeft');
    }, 20000);

    // 25 seconds
    setTimeout(function () {
        console.log('drone flipRight command sent');
        io.to(socket.id).emit('flipRight');
    }, 25000);

    // 30 seconds
    setTimeout(function () {
        console.log('drone backward command sent');
        io.to(socket.id).emit('backward');
    }, 30000);

    // 40 seconds
    setTimeout(function () {
        console.log('drone land command sent');
        io.to(socket.id).emit('land');
    }, 40000);

});

io.on('disconnect', function (socket) {
    console.log('id', socket.id, 'disconnected');
});

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');

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

// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
http.listen(port, function () {
    console.log('Listening on port:', port);
});