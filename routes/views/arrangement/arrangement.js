var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'turar';


	view.query('post', keystone.list('PlanTur').model.findOne()
		.where({slug: req.params.arr})
		.populate('turar')
	);

	// Render the view
	view.render('arrangement/arrangement');
};
