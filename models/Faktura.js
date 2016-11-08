var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Faktura Model
 * ==========
 */

var Faktura = new keystone.List('Faktura', {
	map: { name: 'kunde' },
	autokey: { path: 'slug', from: 'kunde', unique: true },
	label:'Faktura',
	singular:'faktura',
	plural:'faktura'
});

Faktura.add({
	kunde: { type: String, required: true },
	overskrift: { type: String },
	beløp: { type: Number }
});


// Faktura.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Faktura.register();
