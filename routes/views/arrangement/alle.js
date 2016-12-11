var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'turar';
	locals.post = {
		tittel: 'Arrangement'
	}

	view.query('arrangement', keystone.list('PlanTur').model.find().sort('-dato.start')
		.where('dato.slutt', {
			$gte: new Date()
		})
	);
	view.query('histarrangement', keystone.list('PlanTur').model.find().sort('-dato.start')
		.where('dato.slutt', {
			$lt: new Date()
		})
	);

	// Render the view
	view.render('arrangement/alle');
};
