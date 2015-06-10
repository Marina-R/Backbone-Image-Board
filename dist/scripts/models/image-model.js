var MyImage = Backbone.Model.extend({
	defaults: {
		img: null,
		caption: null
	},
	validate: function (attr, options) {
		if(attr.img.substr(0,7) !== 'http://') {
			console.log(attr.img.substr(0,7));
			console.log('error');
			$('#url-error').show();
			return true;
		} else if(attr.caption.length === 0) {
			$('#caption-error').show();
			return true;
		}
		return false;
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/marina-collection',
	idAttribute: '_id'
})