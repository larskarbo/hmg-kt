
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

	view.on('init', function (next) {

		var q = keystone.list('Side').model.findOne({slug:slug})

		q.exec(function (err, results) {
			locals.post = results;

			if(results == null){
				return res.status(404).send(keystone.wrapHTMLError('Side ikke funnet (404)'));	
			}
			next(err);
		});

	});

	view.render('sider/side');

	

	
	// Render the view
	
};
