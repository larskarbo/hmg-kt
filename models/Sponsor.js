var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sponsor Model
 * ==========
 */

var Sponsor = new keystone.List('Sponsor', {
	map: { name: 'namn' },
	autokey: { path: 'slug', from: 'namn', unique: true },
	label:'Samarbeidspartnarar',
	singular:'Samarbeidspartner',
	plural:'Samarbeidspartnarar',
	sortable:true
});

Sponsor.add({
	namn: { type: String, required: true },
	bilde: { type: Types.CloudinaryImage },
	link: { type: Types.Url, label:'Link (url)' },

	beskrivelse: {
		type: Types.Html, wysiwyg: true, height: 400,
	},
});


Sponsor.defaultColumns = 'namn, bilde, beskrivelse';
Sponsor.register();
