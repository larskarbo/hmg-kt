var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'heim';

	view.query('post', keystone.list('Side').model.findOne({slug:'heim'}).sort('sortOrder'));

	// Render the view
	view.render('index');
};