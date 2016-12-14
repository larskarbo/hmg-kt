
function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the animation.
function checkAnimation() {
    var $elem = $('.promo');

    $elem.each(function(index, element){
	    // If the animation has already been started
	    if ($(element).hasClass('seen')) return;

	    if (isElementInViewport($(element))) {
	        // start the start
	        console.log($(element).attr('data-delay'))
	        $(element).addClass('seen');
	        
	        if(typeof $(element).attr('data-delay') != 'undefined'){
	        	setTimeout(function() {
	        		$(element).addClass('start');
	        	}, $(element).attr('data-delay'))
	        }else{
	        	$(element).addClass('start');
	        }
	    }
    	
    })

}

// Capture scroll events
$(window).scroll(function(){
    checkAnimation();
});

$('window').trigger(scroll)