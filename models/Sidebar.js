var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sidebar Model
 * ==========
 */

var Sidebar = new keystone.List('Sidebar', {
	map: { name: 'tittel' },
	autokey: { path: 'slug', from: 'tittel', unique: true },
	label:'Sidebar',
	singular:'Sidebar-element',
	plural:'Sidebar-element'
});

Sidebar.add({
	tittel: { type: String, required: true, initial:true },
	bilde: { type: Types.CloudinaryImage },
	tekst: {
		type: Types.Html, wysiwyg: true, height: 200
	},
	link: {
		type: Types.Url
	}
	// kategori: { type: Types.Select, options: 'sommarSidebarar, vinterSidebarar, familieSidebarar' },
});


// Sidebar.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Sidebar.register();
