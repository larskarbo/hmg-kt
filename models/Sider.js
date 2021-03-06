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
		type: Types.Html, wysiwyg: true, height: 400,
	},
	// url: {
	// 	type: String,
	// 	noedit: true
	// }
});

// Side.schema.pre('save', function(next){

// 	if(this.slug != 'heim')
// 		this.url = '/' + this.slug;
// 	else
// 		this.url ='/'

// 	next()
// })

Side.defaultColumns = 'tittel | url | headerbilde';
Side.register();
