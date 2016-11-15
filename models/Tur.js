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
		full: { type: Types.Html, wysiwyg: true, height: 400 },
		utdrag: { type: Types.Textarea, wysiwyg: true, height: 100 },
	},
	bilder: { type: Types.CloudinaryImages },
	kategori: { type: Types.Select, options: 'sommarturar, vinterturar, familieturar' },
	info:{
		priser: {type: Types.Html, wysiwyg: true, height: 100},
		praktisk: {type: Types.Html, wysiwyg: true, height: 100}
	}
});


// Tur.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Tur.register();
