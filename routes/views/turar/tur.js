var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the 	 selected
	// item in the header navigation.
	locals.section = 'turar';

	// view.query('post', keystone.list('Tur').model.findOne()
	// 	.where('slug',req.params.tur)
	// 	.then(function (err, result) {
	// 		locals.kategori = result.kategori;
	// 	})
	// );

	view.on('init', function (next) {
		keystone.list('Tur').model.findOne({
				slug: req.params.tur,
		}).exec(function (err, result) {
			locals.kategori = result.kategori;
			locals.post = result;

			keystone.list('Preset').model.findOne({
				tittel: 'Standard Turmal',
			}).exec(function (err, result) {
				locals.post.info.preset = result.innhold;
				next(err);
			})
			// locals.post.innhold = resuslt.innhold;
			// locals.post.bilder = result.bilder;
			// locals.post=JSON.parse(JSON.stringify(result));
			// delete locals.post.bilde;
			// console.log(locals.post)
		});
	});

	// Render the view
	view.render('turar/tur');
};
