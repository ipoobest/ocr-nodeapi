var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = mongoose.Schema({
    "name":{
        type:String
    },
    "nameThai":{
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
});

var Menu = module.exports = mongoose.model('menu', menuSchema);

module.exports.getMenu = function(callback, limit){
	Menu.find(callback).limit(limit);
};

module.exports.addMenu = function(menu, callback){
	Menu.create(menu, callback);
};