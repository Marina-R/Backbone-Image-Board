var ImgCollection = Backbone.Collection.extend ({
	model: MyImage,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/marina-collection'
})