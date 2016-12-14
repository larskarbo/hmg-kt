
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