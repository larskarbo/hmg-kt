var keystone = require('keystone'),
	Faktura = keystone.list('Faktura');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;


	view.on('get', function (next){
		Faktura.model.findOne()
			.where('_id', req.params.id)
			.exec(function(err, faktura){
				console.log('faktura', faktura)
				locals.faktura = faktura;

				next()
			})

	})

	// view.on('post', { action: 'contact' }, function (next) {

	// 	var application = new Enquiry.model();
	// 	var updater = application.getUpdateHandler(req);

	// 	updater.process(req.body, {
	// 		flashErrors: true
	// 	}, function (err) {
	// 		if (err) {
	// 			locals.validationErrors = err.errors;
	// 		} else {
	// 			locals.enquirySubmitted = true;
	// 		}
	// 		next();
	// 	});

	// });

	view.render('faktura/faktura');

}


// exports.pay = function(req, res){

// 	if(req.params.id != req.body.id){
// 		return res.end('url and data doesn\'t match')
// 	}
// 	// Set your secret key: remember to change this to your live secret key in production
// 	// See your keys here https://dashboard.stripe.com/account/apikeys
// 	var stripe = require("stripe")(nconf.get('stripe:key'));

// 	// (Assuming you're using express - expressjs.com)
// 	// Get the credit card details submitted by the form
// 	var stripeToken = req.body.stripeToken;
// 	var objectId = req.body.id;
// 	var userEmail = req.body.email;
// 	var chargeId;
// 	var invoice;

// 	console.log(stripeToken);

// 	var conditions = { _id: objectId };

// 	// first get invoice
// 	function getInvoice(callback){
// 		Invoice.find(conditions, function(err, result){
// 			if(err){
// 				console.log('error when check if paid', err)
// 				return error();
// 			}else if(!result.length){
// 				return custom('Fant ikke id ' + objectId + ' i databasen');
// 			}else if(result[0].paid == true){
// 				return already();
// 			}else{
// 				// not paid
// 				invoice = result[0];
// 				callback();
// 			}
// 		});
// 	}

// 	function charge(callback){

// 		var description = 'Ordrenr: ' + invoice.id + ', ';
// 		description += 'objectId: ' + objectId + ', ';
// 		description += 'Namn: ' + invoice.name + ', ';
// 		description += 'Tittel: ' + invoice.title + ', ';
// 		description += 'Beskrivelse: ' + invoice.description;

// 		var charge = stripe.charges.create({
// 		  amount: invoice.amount*100, // amount in cents, again
// 		  currency: "nok",
// 		  source: stripeToken,
// 		  description: description
// 		}, function(err, charge) {
// 			if (err && err.type === 'StripeCardError') {
// 		    // The card has been declined
// 		    return error();
// 		}else if(err){
// 			console.log('error charge', err);
// 			return error();
// 		}else{
// 			console.log('charge', charge.id)
// 			chargeId = charge.id;
// 			description += ', chargeId: ' + chargeId;
// 			callback();
// 		}
// 	});
// 	}

// 	function saveToDb(callback){
// 		var update = { $set: { paid: true, chargeId: chargeId }};
// 		Invoice.update(conditions, update, {}, function(err, result){
// 			if(err){
// 				console.log('error when save to db', err);
// 			}

// 			return callback();
// 		});
// 	}

// 	function sendEmail(callback){
// 		console.log('sending mail ... ')
// 		var text = 'Hei, vi har mottatt din betaling for ordre ' + invoice.id + '.\n\n';
// 		text += 'Bestilling: ' + invoice.title + '\n';
// 		text += 'Beskrivelse: ' + invoice.description + '\n\n';
// 		text += 'Beløp: kr ' + invoice.amount + ' (NOK)\n\n';
// 		text += 'Bestilt av: ' + invoice.name + '\n\n';
// 		text += 'Faktura: http://hjorundfjordmountainguide.no/faktura/' + objectId + '\n\n';
// 		text += 'Spørsmål sendes til ' + nconf.get('mailgun:contact') + '\n';

// 		mailServer.sendMail({
// 			from:nconf.get('mailgun:noreply'),
// 			to:invoice.name + ' <' + userEmail + '>',
// 			subject: 'Betalingsbekreftelse Hjørundfjord Mountainguide',
// 			text: text
// 		}, function(err, body){
// 			console.log('finished')
// 			if(err){
// 				console.log('sendEmail error', err)
// 				return custom('Betaling vellykket, men klarte ikke å sende e-post til '+ userEmail +' .')
// 			}
// 			return callback();
// 		});

// 		mailServer.sendMail({
// 			from:'Faktura <' + nconf.get('mailgun:noreply') + '>',
// 			to:nconf.get('mailgun:invoice'),
// 			subject: '[FAKTURA BETALT] Ordre ' + invoice.id,
// 			text: text
// 		}, function(){
// 			console.log('sent confirmation to ' + nconf.get('mailgun:invoice'));
// 		});
// 	}

// 	function success(){
// 		res.render('pages/postPay.ejs', {
// 			success:true,
// 			message:'Betaling vellykket. En e-post med kvittering er sendt til ' + userEmail,
// 			redirect:false
// 		});
// 	}

// 	function custom(message){
// 		res.render('pages/postPay.ejs', {
// 			success:false,
// 			message:message,
// 			redirect:false
// 		});
// 	}

// 	function already(){
// 		res.render('pages/postPay.ejs', {
// 			redirect:true
// 		});
// 	}

// 	function error(){
// 		res.render('pages/postPay.ejs', {
// 			success:false,
// 			message:'There was an error with the database',
// 			redirect:false
// 		})
// 	};


// 	getInvoice(function(){
// 		charge(function(){
// 			saveToDb(function(){
// 				sendEmail(function(){
// 					success();
// 				})
// 			})
// 		})
// 	})
// }