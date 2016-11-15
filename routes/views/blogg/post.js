var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blogg';
	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		posts: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Post').model.findOne({
			status: 'publisert',
			slug: locals.filters.post,
		});

		q.exec(function (err, result) {
			locals.post = result;
			next(err);
		});

	});


	// Render the view
	view.render('blogg/post');
};
