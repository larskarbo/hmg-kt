var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'blogg';


	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
				filters: {
					status: 'publisert',
				},
		}).populate('forfatter')
		
		q.exec(function (err, results) {
			console.log(results)
			locals.posts = results.results;
			next(err);
		});
	});

	// Render the view
	view.render('blogg/blogg');
};
