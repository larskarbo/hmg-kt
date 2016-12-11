var keystone = require('keystone'),
	Faktura = keystone.list('Faktura');

var mailServer = require('../postvesen');


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	function serveOne(callback) {
		Faktura.model.findOne()
		.where('_id', req.params.id)
		.exec(function(err, faktura){
			if (faktura === null || faktura.length === 0) {
			  return res.status(404).send(keystone.wrapHTMLError('Fann ikkje faktura '+req.params.id+' (404)'));
			}
			console.log('faktura', faktura)
			locals.faktura = faktura;
			console.log(process.env.STRIPE_PUBLISHABLE_KEY)
			locals.stripePublicKey = process.env.STRIPE_PUBLISHABLE_KEY;
			callback()
		})
	}

	view.on('get', function (next){
		
		serveOne(next)
	})

	view.on('post', function (next) {
		console.log(req.body)
		if(req.params.id != req.body.id){
			return res.end('url and data doesn\'t match')
		}
		// Set your secret key: remember to change this to your live secret key in production
		// See your keys here https://dashboard.stripe.com/account/apikeys
		var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

		// (Assuming you're using express - expressjs.com)
		// Get the credit card details submitted by the form
		var stripeToken = req.body.stripeToken;
		var objectId = req.body.id;
		var userEmail = req.body.email;
		var chargeId;

		console.log(stripeToken);

		var conditions = { _id: objectId };

		Faktura.model.findOne()
			.where('_id', objectId)
			.exec(function(err, faktura){
				if(err){
					console.log('error when check if paid', err)
					locals.error = err;
					return next();
				}else if(faktura === null){
					locals.error = 'Fant ikke id ' + objectId + ' i databasen';
					return next();
				}else if(faktura.paid == true){
					locals.message = 'Allerede betalt'
					return next();
				}else{
					// not paid
					charge(faktura)
				}
			})


		function charge(faktura){

			var description = 'Ordrenr: ' + faktura.ordrenr + ', ';
			description += 'objectId: ' + objectId + ', ';
			description += 'Namn: ' + faktura.name + ', ';
			description += 'Tittel: ' + faktura.title + ', ';
			description += 'Beskrivelse: ' + faktura.description;

			var options = {
				amount: faktura.amount*100, // amount in cents, again
				currency: "nok",
				source: stripeToken,
				description: description
			}

			var charge = stripe.charges.create(options, function(err, charge) {
				if (err && err.type === 'StripeCardError') {
				    // The card has been declined
				    console.log(err, err.type)
				    locals.error = 'Kortet ble avvist';
				    return next();
				}else if(err){
					console.log('error charge', err);
					locals.error = 'Kunne ikke gjennomføre betaling';
					locals.error += '<br>' + err;
					return next();
				}else{
					// SUKSESS
					console.log('charge', charge.id)
					chargeId = charge.id;
					description += ', chargeId: ' + chargeId;
					

					savePaid(faktura._id,chargeId, faktura)
				}
			});
		}

		function savePaid(objectId, chargeId, faktura){

			Faktura.model.findOne()
				.where('_id', objectId)
				.update({
					$set: {
						paid:true,
						chargeId:chargeId
					}
				},function(err, result){
					if(err){
						console.log('error when save to db', err);
					}
					console.log(result)
					
					sendEmail(faktura)
					
				})
		}

		function sendEmail(faktura){
			console.log('sending mail ... ')
			var text = 'Hei, vi har mottatt din betaling for ordre ' + faktura.id + '.\n\n';
			text += 'Bestilling: ' + faktura.title + '\n';
			text += 'Beskrivelse: ' + faktura.description + '\n\n';
			text += 'Beløp: kr ' + faktura.amount + ' (NOK)\n\n';
			text += 'Bestilt av: ' + faktura.name + '\n\n';
			text += 'Faktura: http://hjorundfjordmountainguide.no/faktura/' + objectId + '\n\n';
			text += 'Spørsmål sendes til ' + keystone.get('@contact') + '\n';

			mailServer.sendMail({
				from:'Faktura <' + keystone.get('@noreply') + '>',
				to:keystone.get('@faktura'),
				subject: '[FAKTURA BETALT] Ordre ' + faktura.id,
				text: text
			}, function(){
				console.log('sent confirmation to ' + keystone.get('@faktura'));
				
			});
			
			mailServer.sendMail({
				from:keystone.get('@noreply'),
				to:faktura.name + ' <' + userEmail + '>',
				subject: 'Betalingsbekreftelse Hjørundfjord Mountainguide',
				text: text
			}, function(err, body){
				console.log('finished')
				if(err){
					console.log('sendEmail error', err)
					locals.message = ('Betaling vellykket, men klarte ikke å sende e-post til '+ userEmail +' .')
					return next();
				}
				return serveOne(next);
			});

		}

	});

	view.render('faktura/faktura');


}
