var keystone = require('keystone');

/**
 * TurKategori Model
 * ==================
 */

var TurKategori = new keystone.List('TurKategori', {
	autokey: { from: 'name', path: 'key', unique: true },
});

TurKategori.add({
	name: { type: String, required: true },
});

TurKategori.relationship({ ref: 'Tur', path: 'kategoriar' });

TurKategori.register();
