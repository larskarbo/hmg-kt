var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Preset Model
 * ==========
 */

var Preset = new keystone.List('Preset', {
	map: { name: 'tittel' },
	autokey: { path: 'slug', from: 'tittel', unique: true },
	label:'Malar',
	singular:'Mal',
	plural:'Malar',
	sortable:true
});

Preset.add({
	tittel: { type: String, required: true },
	innhold: {
		type: Types.Html, wysiwyg: true, height: 700
	}
});


Preset.defaultColumns = 'tittel, innhold';
Preset.register();
