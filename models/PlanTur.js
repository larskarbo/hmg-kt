var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PlanTur Model
 * ==========
 */

var PlanTur = new keystone.List('PlanTur', {
	map: { name: 'tittel' },
	autokey: { path: 'slug', from: 'tittel', unique: true },
	label:'Arrangement',
	singular:'Arrangement',
	plural:'Arrangement'
});

PlanTur.add({
	tittel: { type: String, required: true, initial:true },
	bilde: { type: Types.CloudinaryImage },
	bilder: { type: Types.CloudinaryImages },
	
	dato: {
		start: {
			type: Types.Date,
			initial: true
		},
		slutt: {
			type: Types.Date,
			initial: true
		}
	},
	innhold: {
		full: { type: Types.Html, wysiwyg: true, height: 400 },
		utdrag: { type: Types.Textarea, height: 100, initial:true },
	},
	turar: {
		type: Types.Relationship,
		ref: 'Tur',
		many: true,
		note:'Her kan du legge til ein eller fleire turar som er relevante for arrangementet'
	},
	plassar: {
		totalt: {
			type: Number,
			label: 'Tilgjengelege plassar totalt'
		},
		opptatte: {
			type: Number,
			label: 'Opptatte plassar'
		},
		ledige: {
			type: Number,
			label: 'Ledige plassar',
			noedit: true,
			note: 'Automatisk kalkulert'
		}
	},
	info:{
		priser: {type: Types.Html, wysiwyg: true, height: 100},
		praktisk: {type: Types.Html, wysiwyg: true, height: 100}
	},
	fbArr: {
		type: Types.Url,
		label: 'Facebook-arrangement',
	},
	

});

PlanTur.schema.pre('save', function(next){

	if(!isNaN(this.plassar.totalt) && !isNaN(this.plassar.opptatte))
		this.plassar.ledige = this.plassar.totalt - this.plassar.opptatte;

	next()
})


// PlanTur.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
PlanTur.register();
