jQuery(document).ready(function($){

	//open popup
	$('.signup-cd-popup-trigger').on('click', function(event){
    $('.cd-popup').removeClass('is-visible');

		// input값 다 지울거
		$("#signup-contact-form :input").each(function(){
		 $(this).val(''); // This is the jquery object of the input, do what you will
		});
		event.preventDefault();
		$('#signup').addClass('is-visible');
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
