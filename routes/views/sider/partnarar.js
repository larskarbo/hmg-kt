
var keystone = require('keystone')
var cloudinary = require('cloudinary')
var fs = require('fs')

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var slug = 'samarbeidspartnarar';
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = slug;


	view.query('post', keystone.list('Side').model.findOne({slug:slug}));
	view.query('partnarar', keystone.list('Sponsor').model.find());


	view.render('sider/samarbeidspartnarar');
	// Render the view
	
};
