var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

app.use(bodyParser.json());

Menu = require('./models/menu');

mongoose.connect('mongodb://localhost:27017/menu');

var db = mongoose.connection;

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/menu', function(req, res){
    // res.end('hello world');
    Menu.getMenu(function(err, menu){
		if(err){
			throw err;
		}
		res.json(menu);
	});
});

app.get('/menu/id/:_id', function(req, res){
	Menu.getMenuById(req.params._id, function(err, menu){
		if(err){
			throw err;
		}
		res.json(menu);
	});
});

app.get('/menu/:nameThai', function(req, res){
	Menu.getMenuByName(req.params.nameThai, function(err, menu){
		if(err){
			throw err;
		}
		res.json(menu);
	});
});

app.post('/menu/add', function(req, res){
	var menu = req.body;
	Menu.addMenu(menu, function(err, menu){
		if(err){
			throw err;
		}
		res.json(menu);
	});
});

var server = app.listen(2222, function(req, res){
    console.log('server start port : 2222');
});