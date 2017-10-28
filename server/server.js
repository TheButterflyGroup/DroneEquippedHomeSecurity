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

    // takeoff in 3 seconds
    setTimeout(function () {
        io.to(socket.id).emit('takeoff');
    }, 3000);

    // land in 6 seconds
    setTimeout(function () {
        io.to(socket.id).emit('land');
    }, 6000);

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
