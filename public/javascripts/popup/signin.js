jQuery(document).ready(function($){
	//open popup
	$('.signin-cd-popup-trigger').on('click', function(event){
		$('.cd-popup').removeClass('is-visible');

		// input값 다 지울거
		$("#signin-contact-form :input").each(function(){
		 $(this).val(''); // This is the jquery object of the input, do what you will
		});
		event.preventDefault();
		$('#signin').addClass('is-visible');
	});
	//close popup
	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$('.cd-popup').removeClass('is-visible');
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
});
