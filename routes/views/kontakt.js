
var keystone = require('keystone')
var cloudinary = require('cloudinary')

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'kontakt';

	view.query('post', keystone.list('Side').model.findOne({slug:'kontakt'}));

	// Render the view
	view.render('kontakt');
};
