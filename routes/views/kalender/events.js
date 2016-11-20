var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	console.log(req.query.start)
	keystone.list('PlanTur').model.find()
	.where({
		'dato.slutt' : { $gte: req.query.start},
		'dato.start' : { $lt: req.query.end},
	})
	.exec(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		var filteredArray = items.map(function(val, i, arr) {
			return {
				title: val.tittel,
				start: val.dato.start,
				end: val.dato.slutt,
				allDay: true,
				url: '/arrangement/' + val.slug
			}
		})

		res.apiResponse(filteredArray);
		
	});

	// Render the view
	 // view.render(function(err) {
		//  if (err) return res.apiError('error', err);
		// 	 res.apiResponse({
		// 	 galleries: locals.galleries
		//  });
	 // });
};