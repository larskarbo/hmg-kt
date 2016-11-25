
var keystone = require('keystone')
var cloudinary = require('cloudinary')

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var slug = req.params.side;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = slug;


	view.query('post', keystone.list('Side').model.findOne({slug:slug}));

	// Render the view
	view.render('kontakt');
};
