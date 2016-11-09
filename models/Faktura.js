var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Faktura Model
 * ==========
 */

var Faktura = new keystone.List('Faktura', {
	label:'Faktura',
	singular:'faktura',
	plural:'faktura',
	nodelete:true,
});

Faktura.add({
	ordrenr: {
		type:Number,
		default:1000,
		unique:true,
		index:true
	},
	name: {
		type:String,
		required: true,
		initial:true,
		label:'Navn (kunde)'
	},
	title:{
		type: String,
		required: true,
		initial:true,
		label:'Tittel'
	},
	description:{
		type: Types.Textarea,
		required: true,
		initial:true,
		label:'Beskrivelse'
	},
	date:{
		type: Types.Date,
		default: Date.now(),
		required: true,
		initial:true,
		label:'Dato (faktura)'
	},
	tripDate:{
		type: Types.Date,
		required: true,
		initial:true,
		label:'Dato (tur)'
	},
	amount:{
		type: Types.Money,
		format: "'0,0.00 kr'",
		required: true,
		get: getPrice,
		set: setPrice,
		initial:true,
		label:'Beløp'
	},
	paid:{
		type: Boolean,
		default: false,
		label:'Betalt',
		noedit:true
	},
	chargeId:{
		type: String,
		noedit:true
	},
	deleted:{
		type: Boolean,
		default: false,
		hidden:true
	},
	link:{
		type: Types.Url,
		noedit:true,
		// format: function(url){
		// 	return 'link';
		// },
		get: function(id){
			// return 'https://hjorundfjordmountainguide.no/faktura/' + id;
			if(typeof id!= 'undefined')
				return '/faktura/' + id;
		}
	}
});

function getPrice(num){
	return (num/100).toFixed(2);
}

function setPrice(num){
	return num*100;
}

Faktura.schema.pre('save', function(next){

	this.link = this._id;

	next()
})



Faktura.defaultSort = '-ordrenr';
Faktura.defaultColumns = 'title, ordrenr, date, name, amount, paid, link';

Faktura.register();