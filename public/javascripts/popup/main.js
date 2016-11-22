jQuery(document).ready(function($){
	//open popup
	$('.cd-popup-trigger').on('click', function(event){
		// input값 다 지울거
		$("#main-contact-form :input").each(function(){
		 $(this).val(''); // This is the jquery object of the input, do what you will
		});
		$('.cd-popup .btn-success').text("Add");
		event.preventDefault();
		$('.cd-popup').addClass('is-visible');
	});
	$('.float').on('click', function(event){
		$("#main-contact-form :input").each(function(){
		 $(this).val(''); // This is the jquery object of the input, do what you will
		});
		$('.cd-popup .btn-success').text("Add");
		event.preventDefault();
		$('.cd-popup').addClass('is-visible');
	});

	//close popup
	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
});
