$('.big-calendar').fullCalendar({
	lang: 'nb',
	fixedWeekCount: false,
	titleFormat: "MMMM",
	weekNumbers: false,
	height: 450,
	dayClick: dayClick,
	eventClick: eventClick,
	events: '/kalender/get-events',
	header:{
		left: 'title',
		center: '',
		right: 'prev,next'
	}
})

function eventClick(date, jsEvent, view){
    console.log('yto')
    
    console.log(date)
}

function dayClick(date, jsEvent, view){
    //
}
