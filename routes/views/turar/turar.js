var keystone = require('keystone');

exports = module.exports = function (req, res, bignext) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'turar';
	locals.kategori = req.params.kategori;
	

	locals.post = {
		tittel: req.params.kategori.charAt(0).toUpperCase() + req.params.kategori.slice(1)
	}
	view.on('init', function (next) {
		keystone.list('Tur').model.find()
			.where('kategori',req.params.kategori)
			.exec(function (err, result) {
				if(result.length == 0){
					return bignext()
				}
				locals.turs = result;
				next(err)
			})
	})
	// Render the view
	view.render('turar/turar');
};
