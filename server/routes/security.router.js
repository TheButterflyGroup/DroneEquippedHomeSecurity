var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// function to animate drone params: io, socketId
var droneAnimate = require('../modules/drone');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var HistorySchema = new Schema({
    status: { type: String },
    time: { type: Date, default: Date.now }
})

var SensorSchema = new Schema({
    type: { type: String },
    name: { type: String },
    isOpen: { type: Boolean },
    history: [HistorySchema],
    userId: { type: ObjectId }
})

var Sensor = mongoose.model('sensors', SensorSchema);

// Creates a new Sensor on the user account
router.post('/sensor', function (req, res) {
    // TODO: Add security
    console.log('in /sensor POST', req.body);
    var sensorData = req.body;
    var newSensor = new Sensor({
        type: sensorData.type,
        name: sensorData.name,
        isOpen: false,
        history: [],
        userId: req.user._id
    });
    newSensor.save(function (err, sensor) {
        console.log('newSensor here');
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log('successful newSensor created');
            res.send(sensor);
        }
    });
});

// adds current sensor readings to history
router.put('/history/:id', function (req, res) {
    console.log('in /motion POST', req.params.id);
    Sensor.findById(req.params.id, function (err, foundSensor) {
        foundSensor.history.push(req.body);
        if (req.body.status === 'open') {
            foundSensor.isOpen = true;

            //animate drone
            console.log('PUT security/history/:id socketId ->', req.app.socketId);
            droneAnimate(req.app.io, req.app.socketId);

        } else if (req.body.status === 'closed') {
            foundSensor.isOpen = false;
        }

        foundSensor.save(function (err) {
            if (err) {
                console.error('ERROR!');
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        });
    });

})

router.get('/all', function (req, res) {
    console.log('in /all GET');

    Sensor.find({}, function (err, response) {
        if (err) {
            console.log('error reading /all from db: ', err);
            res.sendStatus(500);
        } else {
            console.log('/all get route hit');
            res.send(response);
        }
    });
});

module.exports = router;