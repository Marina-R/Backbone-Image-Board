var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
Backbone.$ = $;

var MyImage = require('../models/image-model.js');

module.exports = Backbone.Collection.extend ({
	model: MyImage,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/marina-collection'
})