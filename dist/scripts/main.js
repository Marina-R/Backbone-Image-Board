var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
Backbone.$ = $;

$(document).ready(function() {
	var ImgCollection = require('./collections/image-collection.js');
	var MyImage = require('./models/image-model.js');
	var ImgBoard = new ImgCollection;

	ImgBoard.fetch({
		success: function(ImgCollection) {
			ImgCollection.forEach(function(model){
				$('#img-board').append(imgPoster(model.attributes));
			})
			ImgCollection.on('add', function(image){
				$('#img-board').prepend(imgPoster(image.attributes));
			})
		}
	});
	var imgPoster = _.template($('#to-post').html());

	$('#add').click(function() {
		$('#add-post').show();
	});

	$('#btn1').click(function(e) {
		e.preventDefault();
		var Img = new MyImage({
			img: $('#img-url').val(),
			caption: $('#img-text').val()
		});
		if(Img.isValid()) {
			ImgBoard.comparator = '_id';
			ImgBoard.add(Img);
			Img.save();
			$('#img-url').val('');
			$('#img-text').val('');
			$('#add-post').hide();
		} 
	});
	$('#btn2').click(function(e) {
		e.preventDefault();
		$('#img-url').val('');
		$('#img-text').val('');
		$('#url-error').hide();
		$('#caption-error').hide();
		$('#add-post').hide();
	});
})