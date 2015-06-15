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
		success: function() {
			CommentBoard.fetch();
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

	ImgBoard.on('add', function(image){
		$('#img-board').append(imgPoster({model: image}));
		$('[data-form-cid="' + image.cid + '"]').on('submit', function(e) {
			e.preventDefault();
			var $commentInput = $(this).find('.comment-input');
			var UserComment = new Comment({
				msg: $commentInput.val(),
				imageId: image.get('_id'),
				time: (function setTime() {
					var date = new Date();
					var today = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
					return today;
				})(),
				likes: image.get('likes')
			});
			if(UserComment.isValid()) {
				CommentBoard.comparator = '_id';
				CommentBoard.add(UserComment);
				UserComment.save();
				$('.comment-input').val('');
			};
		})
	});

	CommentBoard.on('add', function(addedComment) {
		var commentHtml = comPoster({model: addedComment});
		var imageId = addedComment.get('imageId');
		var imageModel = ImgBoard.get(imageId);
		if(imageModel) {
			$('[data-cid="' + imageModel.cid + '"] .user-comments').append(commentHtml);
		};
		$('[data-btn-cid="' + addedComment.cid + '"]').on('click', function() {
			var likes = addedComment.get('likes');
			likes++;
			console.log(likes);
			addedComment.set({likes: likes});
			var $numOfLikes = $('[data-cid="' + imageModel.cid + '"] .like-counter').html();
			$numOfLikes = likes;
			// $numOfLikes.html()
			// console.log($numOfLikes);

		});
	});

	
})