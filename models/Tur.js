var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Tur Model
 * ==========
 */

var Tur = new keystone.List('Tur', {
	map: { name: 'tittel' },
	autokey: { path: 'slug', from: 'tittel', unique: true },
	label:'Turar',
	singular:'tur',
	plural:'turar'
});

Tur.add({
	tittel: { type: String, required: true },
	bilde: { type: Types.CloudinaryImage },
	innhold: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	kategoriar: { type: Types.Relationship, ref: 'TurKategori', many: true },
});


// Tur.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Tur.register();
