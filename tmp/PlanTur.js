var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PlanTur Model
 * ==========
 */

var PlanTur = new keystone.List('PlanTur', {
	map: { name: 'tittel' },
	autokey: { path: 'slug', from: 'tittel', unique: true },
	label:'Planlagde turar',
	singular:'Planlagd tur',
	plural:'Planlagde turar'
});

PlanTur.add({
	tittel: { type: String, required: true, initial:true },
	bilde: { type: Types.CloudinaryImage },
	dato: {
		start: {
			type: Types.Date,
			initial: true
		},
		slutt: {
			type: Types.Date,
			initial: true
		}
	}
	innhold: {
		utdrag: { type: Types.TextArea, height: 100 },
		full: { type: Types.Html, wysiwyg: true, height: 400, initial:true },
	},
	turar: {
		type: Types.Relationship,
		ref: 'Tur',
		many: true,
		note:'Her kan du legge til ein eller fleire turar som er relevante for arrangementet'
	},
	plassar: {
		totalt: {
			type: Types.Number,
			label: 'Tilgjengelege plassar totalt'
		},
		opptatte: {
			type: Types.Number,
			label: 'Opptatte plassar'
		},
		ledige: {
			type: Types.Number,
			label: 'Ledige plassar',
			noedit: true;
			note: 'Automatisk kalkulert'
		}
	},
	fbArr: {
		type: Types.Link,
		label: 'Facebook-arrangement',
	}

});


// PlanTur.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
PlanTur.register();
