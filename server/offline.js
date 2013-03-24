var express = require('express');
var monk = require('monk');
var cors = require("./cors");

var mongodbUrl = 'mongodb://localhost:27017/test';
var mongodbResource = 'frameworks';

var db = monk(mongodbUrl);
var frameworks = db.get(mongodbResource);

var server = express();
server.use(express.bodyParser());
server.use(cors.express);

server.all('/frameworks', function (req, res) {
  console.log('/frameworks', req.method, req.body);
  switch (req.method) {
    case 'GET':
      frameworks.find({}, function (err, docs) {
        res.send(docs);
      });
      break;
    case 'PUT':
      frameworks.remove({}, function () {
        frameworks.insert(req.body, function (err, doc) {
          res.send(doc);
        });
      });
      break;
    case 'POST':
      frameworks.insert(req.body, function (err, doc) {
        res.send(doc);
      });
      break;
    case 'DELETE':
      frameworks.remove({}, function () {
        res.send(200);
      });
      break;
    default:
      res.status(400).send('Method ' + req.method + 'not supported');
  }
});

server.all('/frameworks/:_id', function (req, res) {
  console.log('/frameworks/:_id', req.method, req.params, req.body);
  switch (req.method) {
    case 'GET':
      frameworks.findOne(req.params, function (err, doc) {
        res.send(doc);
      });
      break;
    case 'PUT':
      if (req.body._id) {
        delete req.body._id;
      }
      frameworks.findAndModify({_id: req.params._id}, {$set: req.body}, function (err, doc) {
        res.send(doc);
      });
      break;
    case 'POST':
      frameworks.updateById(req.params._id, req.body, function (err, doc) {
        res.send(doc);
      });
      break;
    case 'DELETE':
      frameworks.remove(req.params, function () {
        res.send(200);
      });
      break;
    default:
      res.status(400).send('Method ' + req.method + 'not supported');
  }
});

console.log('Starting pure REST handler for ' + mongodbUrl + ":" + mongodbResource);
server.listen(1234);