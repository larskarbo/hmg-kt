var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'heim';

	view.query('post', keystone.list('Side').model.findOne({slug:'heim'}).sort('sortOrder'));
	view.query('guidar', keystone.list('Guide').model.find().sort('sortOrder'));
	view.query('eksempeltur', keystone.list('Tur').model.findOne({'bilde.url': {$ne: ""}}))
	view.query('eksempelarr', keystone.list('PlanTur').model.findOne({'bilde.url': {$ne: ""}}))

	// Render the view
	view.render('index');
};