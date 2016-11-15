var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'tittel' },
	autokey: { path: 'slug', from: 'tittel', unique: true },
});

Post.add({
	tittel: { type: String, required: true, initial:true },
	status: { type: Types.Select, options: 'ikkje publisert, publisert', default: 'publisert', index: true },
	forfatter: { type: Types.Relationship, ref: 'Bruker', index: true },
	dato: { type: Types.Date, default:Date.now(), index: true},
	// headerbilde: { type: Types.CloudinaryImage },
	bilder: { type: Types.CloudinaryImages },
	innhold: {
		full: { type: Types.Html, wysiwyg: true, height: 400 },
	},
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'tittel, status|20%, forfatter|20%, dato|20%';
Post.register();
