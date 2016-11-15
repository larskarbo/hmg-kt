var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'arrangement';

	view.query('post', keystone.list('PlanTur').model.findOne()
		.where({_id: req.params.arr})
		.sort('-dato.start')
	);

	// Render the view
	view.render('arrangement/arrangement');
};
