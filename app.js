var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var stringSimilarity = require('string-similarity');

app.use(bodyParser.json());

Menu = require('./models/menu');

mongoose.connect('mongodb://localhost:27017/menu');
// mongoose.connect('mongodb://db:27017/menu');

var db = mongoose.connection;

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/menu', function(req, res){
    Menu.getMenu(function(err, menu){
		if(err){
			throw err;
		}
		res.json(menu);
	});
});

app.get('/menu/id/:_id', function(req, res){
	var id = req.params._id;
	Menu.getMenuById(id, function(err, menu){
		if(err){
			throw err;
		}
		res.json(menu);
	});
});

//Compare word to get menu
app.get('/menu/:nameThai', function(req, res){
	var nameThai = req.params.nameThai;
	var name_max = '';
	var max = 0;
	Menu.getMenu(function(err, menu){
		if(err){
			throw err;
		}
		for ( i in menu ) {
			var ratio = stringSimilarity.compareTwoStrings(nameThai, menu[i].nameThai);
			if (ratio == 1) {
				name_max = menu[i].nameThai;
				break;
			}
			else if(ratio > max) {
				name_max = menu[i].nameThai;
				max = ratio;
			}
		}
		res.redirect('/query/' + name_max);
	});
});

app.get('/query/:nameThai', function(req, res){
	var nameThai = req.params.nameThai;
	Menu.getMenuByName(nameThai, function(err, menu){
		if(err){
			throw err;
		}
		res.json(menu);
	});
});

//Compare word to get menues
app.get('/menu/querymenu/:nameThai', function(req, res){
	var nameThaiArry = req.params.nameThai.split('\n');
	var name_max_arry = [];
	Menu.getMenu(function(err, menu){
		if(err){
			throw err;
		}
		nameThaiArry.forEach(function(nameThai) {
			var name_max = '';
			var max = 0;
			for ( i in menu ) {
				var ratio = stringSimilarity.compareTwoStrings(nameThai, menu[i].nameThai);
				if (ratio == 1) {
					name_max = menu[i].nameThai;
					break;
				}
				if(ratio > max) {
					name_max = menu[i].nameThai;
					max = ratio;
				}
			}
			name_max_arry.push(name_max);
		});
		res.redirect('/querymenu/' + name_max_arry);
	});
});

app.get('/querymenu/:nameThai', function(req, res){
	var nameThai = req.params.nameThai;
	Menu.getMenuesByName(nameThai, function(err, menu){
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

app.delete('/menu/delete/:nameThai', function(req, res){
	var nameThai = req.params.nameThai;
	Menu.deleteByName(nameThai, function(err, menu){
		if(err){
			throw err;
		}
		res.json(menu);
	});
});

//delete menu by id
app.delete('/menu/delete/id/:_id', function(req, res){
	var _id = req.params._id;
	Menu.deleteById(_id, function(err, menu){
		if(err){
			throw err;
		}
		res.json(menu);
	});
});

app.put('/menu/update/:nameThai', function(req, res){
	var nameThai = req.params.nameThai;
	var menu = req.body;
	Menu.updateMenu(nameThai, menu, {}, function(err, menu){
		if(err){
			throw err;
		}
		res.json(menu);
	});
});

var server = app.listen(3000, function(req, res){
    console.log('server start port : 3000');
});