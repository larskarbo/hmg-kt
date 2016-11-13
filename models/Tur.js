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
		utdrag: { type: Types.Textarea, wysiwyg: true, height: 100 },
		full: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	bilder: { type: Types.CloudinaryImages },
	kategori: { type: Types.Select, options: 'sommarturar, vinterturar, familieturar' },
});


// Tur.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Tur.register();
