var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Side Model
 * ==========
 */

var Side = new keystone.List('Side', {
	map: { name: 'tittel' },
	autokey: { path: 'slug', from: 'tittel', unique: true },
	label:'Sider',
	singular:'side',
	plural:'sider'
});

Side.add({
	tittel: { type: String, required: true },
	headerbilde: { type: Types.CloudinaryImage },
	innhold: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	}
});


// Side.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Side.register();
