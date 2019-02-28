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
	// nodelete:true,
});

Faktura.add({
	ordrenr: {
		type:Number,
		unique:true,
		index:true,
		noedit:true
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
		format: function(url){
			return url;
		},
		get: function(id){
			if(typeof id!= 'undefined')
			return 'https://hjorundfjordmountainguide.no/faktura/' + id;
			// return '/faktura/' + id;
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

Faktura.schema.pre('save', function(next){
	var doc = this;
	// find latest
	if(typeof this.ordrenr == 'undefined' || this.ordrenr == null){
		var min = 10000;
		Faktura.model.find().select('ordrenr').sort({
				"ordrenr": -1
			}).exec(function(err, jaja) {
				doc.ordrenr = Math.max(jaja[0]._doc.ordrenr, min) + 1
				next()
				})
	}else{
		next()
	}

})

Faktura.schema.pre('remove', function(next){
	
	// if(this.paid === true){
	// 	var err = new Error('Du kan ikkje slette en faktura som er betalt');
	// 	next(err)
	// }else{
		next()
	// }

})


Faktura.defaultSort = '-date';
Faktura.defaultColumns = 'title, ordrenr, tripDate, name, amount, paid|5%, link';

Faktura.register();