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
	console.log('trying this!!')
	console.log(this)
	// find latest
	if(typeof this.ordrenr == 'undefined' || this.ordrenr == null){
		var max = 9999;
		var min = 1000;
		var tries = {
			done: 0,
			max: 10
		}
		function findOrdrenr() {
			var guess = Math.round(Math.random() * (max-min) + min);
			Faktura.model.count()
				.where('ordrenr', guess)
				.exec(function(err, count) {
					console.log(count)
					if(count != 0){
						tries.done++;
						if(tries.done >= tries.max){
							var err = new Error('Prøvde å finne ordrenr ' + tries.done + ' gongar uten hell');
							next(err)
						}else{
							findOrdrenr()
						}
					}
					else{
						doc.ordrenr = guess;
						next();
					}

				})
		}
		findOrdrenr()
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