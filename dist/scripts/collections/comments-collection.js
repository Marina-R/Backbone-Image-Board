var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
Backbone.$ = $;

var Comment = require('../models/comment-model.js'); 

module.exports = Backbone.Collection.extend({
	model: Comment,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/marina-comments'
}) 