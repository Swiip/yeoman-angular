var express = require('express');
var monk = require('monk');
var cors = require("./cors");

var mongodbUrl = 'mongodb://swiip:password@linus.mongohq.com:10056/angular';
var mongodbResource = 'carottes';

var db = monk(mongodbUrl);
var carottes = db.get(mongodbResource);

var server = express();
server.use(express.bodyParser());
server.use(cors.express);

server.all('/carottes', function (req, res) {
    console.log('/carottes', req.method, req.body);
    switch (req.method) {
        case 'GET':
            carottes.find({}, function (err, docs) {
                res.send(docs);
            });
            break;
        case 'PUT':
            carottes.remove({}, function () {
                carottes.insert(req.body, function () {
                    res.send(200);
                });
            });
            break;
        case 'POST':
            carottes.insert(req.body, function (err, doc) {
                res.send(doc);
            });
            break;
        case 'DELETE':
            carottes.remove({}, function () {
                res.send(200);
            });
            break;
        default:
            res.status(400).send('Method ' + req.method + 'not supported');
    }
});

server.all('/carottes/:_id', function (req, res) {
    console.log('/carottes/:_id', req.method, req.params, req.body);
    switch (req.method) {
        case 'GET':
            carottes.findOne(req.params, function (err, doc) {
                res.send(doc);
            });
            break;
        case 'PUT':
            if(req.body._id) {
                delete req.body._id;
            }
            carottes.findAndModify({_id : req.params._id}, {$set: req.body}, function (err, doc) {
                res.send(200);
            });
            break;
        case 'POST':
            carottes.updateById(req.params._id, req.body, function (err, doc) {
                res.send(200);
            });
            break;
        case 'DELETE':
            carottes.remove(req.params, function () {
                res.send(200);
            });
            break;
        default:
            res.status(400).send('Method ' + req.method + 'not supported');
    }
});

console.log('Starting pure REST handler for ' + mongodbUrl + ":" + mongodbResource);
server.listen(1234);