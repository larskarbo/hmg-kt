
var keystone = require('keystone')
var cloudinary = require('cloudinary')

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'kontakt';
	locals.cldcnf = cloudinary.cloudinary_js_config()
	locals.upd1 =cloudinary.uploader.image_upload_tag('image_id', { callback: function(err,res){
		console.log (err, res)
	} });
	locals.upld = cloudinary.uploader.image_upload_tag('image_id', { html: { multiple: 1 } });

	view.query('post', keystone.list('Side').model.findOne({slug:'kontakt'}).sort('sortOrder'));

	// Render the view
	view.render('kontakt');
};
