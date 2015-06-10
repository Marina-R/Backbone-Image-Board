$(document).ready(function() {
	var ImgBoard = new ImgCollection();
	ImgBoard.fetch();
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
		$('#add-post').hide();
	})
	ImgBoard.on('add', function(model) {
		var newImg = imgPoster(model.attributes);
		$('#img-board').append(newImg);

	});
})