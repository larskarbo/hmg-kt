var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Guide Model
 * ==========
 */

var Guide = new keystone.List('Guide', {
	map: { name: 'namn' },
	autokey: { path: 'slug', from: 'namn', unique: true },
	label:'Guidar',
	singular:'guide',
	plural:'guidar'
});

Guide.add({
	namn: { type: String, required: true },
	bilde: { type: Types.CloudinaryImage },
	beskrivelse: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
});


// Guide.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Guide.register();
