var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null, 
		img: null,
		caption: null
	},
	validate: function (attr, options) {
		if((attr.img.substr(0,7) == 'http://' || attr.img.substr(0,8) == 'https://')
			&&  attr.caption.length !== 0) {
			return false;
		} else if(!(attr.img.substr(0,7) == 'http://' || attr.img.substr(0,8) == 'https://')) {
			$('#url-error').show();
			return true;
		} else if(attr.caption.length == 0) {
			$('#url-error').hide();
			$('#caption-error').show();
			return true;
		}
		return false;
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/marina-collection',
	idAttribute: '_id'
})