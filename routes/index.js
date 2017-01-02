/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);


// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
keystone.pre('render', middleware.fbReady);

keystone.pre('render', middleware.seo);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);

	app.post('/postvesen', routes.views.postvesen.kontaktskjema)

	app.get('/turar', routes.views.turar.kategoriVelg);
	app.get('/turar-kategori/:kategori', routes.views.turar.turar);
	app.get('/turar/:tur', routes.views.turar.tur);

	app.get('/arrangement', routes.views.arrangement.alle);
	app.get('/arrangement/:arr', routes.views.arrangement.arrangement);

	app.all('/faktura/:id', routes.views.faktura.faktura);

	app.get('/kontakt', routes.views.sider.kontakt);
	app.get('/om-oss', routes.views.sider.omOss);
	// app.get('/samarbeidspartnarar', routes.views.sider.partnarar);

	if(process.env.NODE_ENV != 'production'){
		app.get('/robots.txt', function (req, res) {
			    res.type('text/plain');
			    res.send("User-agent: *\nDisallow: /");
		});
	}

	app.get('/:side',  routes.views.sider.side)




	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
