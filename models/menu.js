var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = mongoose.Schema({
    "name":{
        type:String
    }
});

var Menu = module.exports = mongoose.model('Menu', menuSchema);

module.exports.getMenu = function(callback, limit){
	Menu.find(callback).limit(limit);
};

module.exports.addMenu = function(menu, callback){
	Menu.create(menu, callback);
};