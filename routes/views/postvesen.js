var formidable = require('formidable');
var util = require('util');

var keystone = require('keystone');

keystone.set("domain","hjorundfjordmountainguide.no");
keystone.set("@noreply","noreply@hjorundfjordmountainguide.no");
keystone.set("@faktura","faktura@hjorundfjordmountainguide.no");
// keystone.set("@contact","kontakt@hjorundfjordmountainguide.no");
keystone.set("@contact","kontakt@hjorundfjordmountainguide.no");


var api_key = process.env.MAILGUN_API_KEY;
var domain = keystone.get('domain');
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports.kontaktskjema = module.exports.kontaktskjema = function (req, res){
	var text = "";
	for(var key in req.body){
		var storBokstavKey = key.charAt(0).toUpperCase() + key.slice(1);
		text += storBokstavKey + ': ' + req.body[key] + '\n';
	}

	var data = {
		from: 'Kontaktskjema ['+req.body.namn+']<' + keystone.get('@noreply') + '>',
		to: keystone.get('@contact'),
		subject: 'Melding fra: ' + req.body.namn,
		text: text
	};

	console.log(req.body);
	mailgun.messages().send(data, function (error, body) {
		if(error){
			console.log('mail error: ', error)
			res.end(error);
		}else{
			res.end('success');
		}
	});

	var mottatt = "Vi har mottatt din melding og vil komme med tilbakemelding så fort som mulig. \n\n ---- \n\n"
	mailgun.messages().send({
		from: 'Kontaktskjema ['+req.body.namn+']<' + keystone.get('@noreply') + '>',
		to: req.body.epost,
		subject: 'Melding mottatt',
		text: mottatt + text
	}, function (error, body) {
	});
}

exports.sendMail = function(data, callback){
	mailgun.messages().send(data, function (error, body) {
		
		callback(error, body);
	});
}

// exports.testSendMail = function(req, res){

// 	var data = {
// 		from: 'Testepost <noreply@hjorundfjordmountainguide.no>',
// 		to: 'larskarbo@gmail.com',
// 		subject: 'Melding fra: yolo',
// 		text: 'Navn: tulleri'
// 	};

// 	mailgun.messages().send(data, function (error, body) {
// 		if(err) throw err

// 			res.send('success')
// 	});
// }