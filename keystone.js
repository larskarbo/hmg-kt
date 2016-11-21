// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var cons = require('consolidate');
var nunjucks = require('nunjucks');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Hjørundfjord Mountainguide',
	'brand': 'Hjørundfjord Mountainguide',
	'admin path': 'admin',
	'signin logo': '../images/logo.svg',

	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': ['templates','templates/views'],
	'view engine': 'html',
	'custom engine': cons.nunjucks,

//	'auto update': true,
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
	 system: 'Bruker'
	//users: 'users',
});

keystone.set('wysiwyg additional buttons', 'styleselect')

// console.log('maaaaa',process.env.CLOUDINARY_URL)

keystone.set('fb-domain','https://hjorundfjordmountainguide.no');

keystone.set('cloudinary secure', true);

// Start Keystone to connect to your database and initialise the web server

keystone.start();
