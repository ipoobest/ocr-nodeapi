var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = mongoose.Schema({
    "name":{
        type:String
    },
    "nameThai":{
        type:String
    },
    "type":{
        type:String
    },
    "description":{
        type:String
    },
    "ingredient":{
        type:String
    },
    "imgUrl":{
        type:String
    },
    "rating":{
        type:Number
    },
    "quantity":{
        type:Number
    },
    "review":[{
        user: String,
        rate: Number,
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
});

var Menu = module.exports = mongoose.model('menu', menuSchema);

//Get menu
module.exports.getMenu = function(callback, limit){
	Menu.find(callback).limit(limit);
};

//Get menu (by id)
module.exports.getMenuById = function(id, callback){
	Menu.findById(id, callback);
};

//Get menu (by nameThai)
module.exports.getMenuByName = function(name, callback){
    var name = {nameThai: name};
    Menu.findOne(name, callback);
};

//Get menus (by nameThai)
module.exports.getMenuesByName = function(name, callback){
    var nameArry = name.split(',');
    var name = {nameThai: nameArry};
    Menu.find(name,callback);
};

//Add menu
module.exports.addMenu = function(menu, callback){
	Menu.create(menu, callback);
};

//Delete menu (by id)
module.exports.deleteById = function(id, callback){
	var id = {_id: id};
	Menu.remove(id, callback);
};

//Delete menu (by nameThai)
module.exports.deleteByName = function(name, callback){
	var name = {nameThai: name};
	Menu.remove(name, callback);
};

//Update menu (by nameThai)
module.exports.updateMenu = function(name, menu, options, callback){
    var update = {};
    var name = {nameThai: name};
    if(menu.name) {
        update['name'] = menu.name;
    }
    if(menu.nameThai) {
        update['nameThai'] = menu.nameThai;
    }
    if(menu.type) {
        update['type'] = menu.type;
    }
    if(menu.description) {
        update['description'] = menu.description;
    }
    if(menu.ingredient) {
        update['ingredient'] = menu.ingredient;
    }
    if(menu.imgUrl) {
        update['imgUrl'] = menu.imgUrl;
    }
    if(menu.rating) {
        update['rating'] = menu.rating;
    }
    if(menu.quantity) {
        update['quantity'] = menu.quantity;
    }
    Menu.findOneAndUpdate(name, update, options, callback);
};
