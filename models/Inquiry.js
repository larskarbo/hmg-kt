var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Inquiry Model
 * ==========
 */

var Inquiry = new keystone.List('Inquiry', {
	map: { name: 'namn' },
	autokey: { path: 'slug', from: 'namn', unique: true },
	label:'Påmeldingar',
	singular:'Påmelding',
	plural:'Påmeldingar',
    defaultSort: 'dato.start'
});

Inquiry.add({
	namn: { type: String, required: true, initial:true },
	telefon: { type: String},
	epost: { type: String},
	adresse: { type: String},
	postnr: { type: String},
	stad: { type: String},
	
	arrangement: {
		type: Types.Relationship,
		ref: 'PlanTur',
	},
	melding: {
		type: Types.Textarea
	},
	antall: {
		type: Types.Number,
		label: 'Antall personar'
	},
	bekrefta: {
		type: Types.Boolean,
	},
});

Inquiry.schema.pre('save', function(next){
	next()
})


Inquiry.defaultColumns = 'namn, telefon, epost, arrangement, melding, antall, bekrefta';
Inquiry.register();
