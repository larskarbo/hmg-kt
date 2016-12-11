/**

This module handles contact forms

**/
window.contact=(function(){
	//private
	var element;

	function submit(e){
		e.preventDefault();

		$('#skjema .questions').addClass('loading');

		i = 0;
		element.find('button').html("Sender");
		var interval = setInterval(function() {
			i = ++i % 4;
			element.find('button').html("Sender"+Array(i+1).join("."));
		}, 750);

		var data = element.serializeArray();
		console.log(element);
		console.log(data);

		$.ajax({
			url: "/postvesen", 
			method: "POST",
			data: data
		}).done(function(response) {
			console.log('successfully posted request: ' + response);
			finished('Melding sendt');
			console.log(response);
			//element.find('*').val('');
		})
		.fail(function() {
			finished('Kunne ikke sende epost. Vennligst send manuelt til kontakt@hjorundfjordmountainguide.no');
		});

		function finished(message){
			clearInterval(interval);
			element.find('.questions').removeClass('loading');

			element.find('button').html('Send');
			element.find('.message').html(message);
		}
	}



	//public:
	return{
		init:function(elm){
			element = $(elm);

			$(element).submit(submit)
		}
	}

}());

contact.init($('#skjema'))