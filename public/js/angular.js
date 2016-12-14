
menuOpen = false;
function toggleMenu() {
	console.log('yee')

	menuOpen = !menuOpen;

	if(menuOpen){
		$('.ismenuopen').addClass('open')
	}else{
		$('.ismenuopen').removeClass('open')
	}
}

$('[clickopen]').click(function() {
	$($(this).attr('clickopen')).addClass('open')
	// console.log($(this).attr('killme'))
	if($(this).attr('killme').length == 0){
		$(this).remove()
	}
})