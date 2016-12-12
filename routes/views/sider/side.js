
var keystone = require('keystone')
var cloudinary = require('cloudinary')
var fs = require('fs')

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var slug = req.params.side;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = slug;


	view.query('post', keystone.list('Side').model.findOne({slug:slug}));

	console.log('sfajfijdsiafj')

	
	view.render('sider/side');
	// Render the view
	
};
