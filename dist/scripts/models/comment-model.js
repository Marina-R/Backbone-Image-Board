var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		msg: null,
		time: null,
		likes: 0
	},
	validate: function(attr, options) {
		if(attr.msg.length == 0) {
			$('#comment-error').show();
			return true;
		}
		$('#comment-error').hide();
		return false;
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/marina-comments',
	idAttribute: '_id'
}); 