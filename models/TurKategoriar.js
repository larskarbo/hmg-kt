var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * TurKategori Model
 * ==========
 */

var TurKategori = new keystone.List('TurKategori', {
	map: { name: 'tittel' },
	autokey: { path: 'slug', from: 'tittel', unique: true },
	label:'Tur-kategoriar',
	singular:'Tur-kategori',
	plural:'Tur-kategoriar',
	sortable:true
});

TurKategori.add({
	tittel: { type: String, required: true },
	bilde: { type: Types.CloudinaryImage },
	beskrivelse: {
		type: Types.Textarea, wysiwyg: true, height: 100
	}
	
});


TurKategori.defaultColumns = 'tittel, beskrivelse, bilde';
TurKategori.register();
