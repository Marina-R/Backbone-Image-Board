var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
Backbone.$ = $;

$(document).ready(function() {
	var ImgCollection = require('./collections/image-collection.js');
	var MyImage = require('./models/image-model.js');
	var ImgBoard = new ImgCollection();
	var Comment = require('./models/comment-model.js');
	var CommentsCollection = require('./collections/comments-collection.js');
	var CommentBoard = new CommentsCollection();

	ImgBoard.fetch({
		success: function(ImgCollection) {
			ImgCollection.forEach(function(model){
				$('#img-board').append(imgPoster(model.attributes));
			});
			ImgBoard.on('add', function(image){
				$('#img-board').prepend(imgPoster(image.attributes));
			});

			CommentBoard.fetch({
				success: function(CommentsCollection) {
					CommentsCollection.forEach(function(model){
						$('#user-comments').append(comPoster(model.attributes));
					});
					CommentBoard.on('add', function(comment){
						$('#user-comments').prepend(comPoster(comment.attributes));
							$('#like-btn').click(function() {
				console.log('hello');
			});
					});
				}
			});

			$('#comment').submit(function(e) {
				e.preventDefault();
				var UserComment = new Comment({
					msg: $('#comment-input').val(),
					time: (function setTime() {
						var date = new Date();
						var today = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
						return today;
					})()
				});
				if(UserComment.isValid()) {
					CommentBoard.comparator = '_id';
					CommentBoard.add(UserComment);
					UserComment.save();
					$('#comment-input').val('');
				}
			});
		}
	});

	var imgPoster = _.template($('#to-post').html());
	var comPoster = _.template($('#comments').html());

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