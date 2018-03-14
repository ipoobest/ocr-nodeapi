var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

app.use(bodyParser.json());

Menu = require('./models/menu');

mongoose.connect('mongodb://localhost:27017/menu');

app.get('/', function(req, res){
    res.end('hello world');
});


var server = app.listen(2222, function(req, res){
    console.log('server start port : 2222');
});