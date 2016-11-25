// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var cons = require('consolidate');
var nunjucks = require('nunjucks');

// add nunjucks to requires so filters can be
// added and the same instance will be used inside the render method
cons.requires.nunjucks = nunjucks.configure('templates', {

});

cons.requires.nunjucks.addFilter('exists', function (thing) {
	console.log('%%%%%%%%%%%%%%%%%%%', thing)
	console.log(JSON.stringify(thing) == "{}")
	if(JSON.stringify(thing) == "{}")
		return false
	else		
		return true;
});
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Hjørundfjord Mountain Guide',
	'brand': 'Hjørundfjord Mountain Guide',
	'admin path': 'admin',
	'signin logo': '../images/logo400.png',

	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': ['templates','templates/views'],
	'view engine': 'html',
	'custom engine': cons.nunjucks,

	'auto update': true,
	'session': true,
	'session store': 'mongo',
	'auth': true,
	'user model': 'Bruker',
	//'wysiwyg cloudinary images': true
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	innhold: ['Tur', 'PlanTur', 'Side', 'Guide', 'Sidebar'],
	// galleries: 'galleries',
	// enquiries: 'enquiries',
	faktura: 'Faktura',
	blogg: 'Post',
	// system: 'Bruker'
	//users: 'users',
});

keystone.set('wysiwyg additional buttons', 'styleselect')
keystone.set('cloudinary prefix', process.env.CLOUDINARY_PREFIX)

keystone.set('cloudinary folders', true)
// console.log('asdfjisdfjai',keystone.get('env'))

keystone.set('fb-domain','https://hjorundfjordmountainguide.no');

keystone.set('cloudinary secure', true);

// Start Keystone to connect to your database and initialise the web server

keystone.start();
