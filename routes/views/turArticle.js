var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'turar';

	// view.query('turs', keystone.list('Tur').model.find().sort('sortOrder'));

	view.on('init', function (next) {
		var q = keystone.list('Tur').model.findOne({
				slug: req.params.tur,
		});

		q.exec(function (err, result) {
			locals.post = result;
			console.log(result)
			next(err);
		});
	});

	// Render the view
	view.render('turar/turen');
};
