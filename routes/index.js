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

var restful = require('restful-keystone')(keystone);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.sidebar);
keystone.pre('render', middleware.flashMessages);
keystone.pre('render', middleware.fbReady);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);

	app.get('/blogg?', routes.views.blogg.blogg);
	app.get('/blogg/:post', routes.views.blogg.post);
	// app.get('/gallery', routes.views.gallery);
	app.get('/kontakt', routes.views.kontakt);
	app.post('/postvesen', routes.views.postvesen.kontaktskjema)

	app.get('/turar', routes.views.turar.kategoriVelg);
	app.get('/turar/:kategori', routes.views.turar.turar);
	app.get('/tur/:tur', routes.views.turar.tur);

	app.get('/arrangement', routes.views.arrangement.alle);
	app.get('/arrangement/:arr', routes.views.arrangement.arrangement);

	app.get('/faktura/:id', routes.views.faktura.faktura);
	// app.post('/faktura/:id', routes.views.incoice.pay);

	// app.get('/faktura/:id', function(req, res, next){
		// invoiceServer.getInvoice(req.params.id, function(err, invoice){
		// 	if(err || invoice == null){
		// 		next()
		// 	}else{
		// 		console.log('invoice', invoice);
		// 		invoice.stripePublicKey = nconf.get('stripe:public:key');
		// 		res.render('pages/betal.ejs', invoice);
		// 	}
		// })
	// })


	restful.expose({
	}).start();

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
