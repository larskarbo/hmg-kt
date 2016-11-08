var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Bruker Model
 * ==========
 */
var Bruker = new keystone.List('Bruker');

Bruker.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Bruker.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Bruker.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Bruker.defaultColumns = 'name, email, isAdmin';
Bruker.register();
