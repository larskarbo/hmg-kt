// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var cons = require('consolidate');
var nunjucks = require('nunjucks');
var cheerio = require('cheerio');

// add nunjucks to requires so filters can be
// added and the same instance will be used inside the render method
cons.requires.nunjucks = nunjucks.configure('templates', {

});

cons.requires.nunjucks.addFilter('exists', function (thing) {
	if(typeof thing == 'undefined' || thing == null || thing.length ==0)
		return false
	if(JSON.stringify(thing) == "{}")
		return false
	else		
		return true;
});

cons.requires.nunjucks.addFilter('smartHeadings', function (thing, tag, cl) {
	if(typeof thing == 'undefined')
		return

	var $ = cheerio.load(thing)

	$('p').each(function(i, elem) {
		var text = $(this).text();
		if(text.length <= 2){
			$(this).remove(); return
		}
		var regex = /[a-z]/;
		if(text.match(regex) == null){
			text = text.toLowerCase()
			  .split(' ')
			  .map(i => i[0].toUpperCase() + i.substring(1))
			  .join(' ')
			if(typeof cl != 'undefined' ){
				$(this).replaceWith('<'+tag+' class="'+cl+'">'+ text +'</'+tag+'>');
			}else{
				$(this).replaceWith('<'+tag+'>'+ text +'</'+tag+'>');
			}
		}
	});
	console.log('chrio', $.html())

	return $.html()
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
	// 'view cache': false,
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
	innhold: ['Tur', 'TurKategori', 'Preset', 'PlanTur', 'Side', 'Guide', 'Sponsor'],
	// galleries: 'galleries',
	// enquiries: 'enquiries',
	faktura: 'Faktura',
	// system: 'Bruker'
	//users: 'users',
});

keystone.set('wysiwyg additional buttons', 'styleselect')
keystone.set('cloudinary prefix', process.env.CLOUDINARY_PREFIX)

keystone.set('cloudinary folders', true)


keystone.set('fb-domain','https://hjorundfjordmountainguide.no');

keystone.set('cloudinary secure', true);

// Start Keystone to connect to your database and initialise the web server

keystone.start();
