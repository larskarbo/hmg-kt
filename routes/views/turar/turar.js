var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'turar';
	locals.kategori = req.params.kategori;
	

	locals.post = {
		tittel: req.params.kategori.charAt(0).toUpperCase() + req.params.kategori.slice(1)
	}

	view.query('turs', keystone.list('Tur').model.find()
		.where('kategori',req.params.kategori)
	);

	// Render the view
	view.render('turar/turar');
};
