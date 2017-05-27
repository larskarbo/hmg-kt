var formidable = require('formidable');
var util = require('util');

var keystone = require('keystone');

keystone.set("domain","hjorundfjordmountainguide.no");
keystone.set("@noreply","noreply@hjorundfjordmountainguide.no");
keystone.set("@faktura","faktura@hjorundfjordmountainguide.no");
keystone.set("@contact","kontakt@hjorundfjordmountainguide.no");

keystone.set("@contact","post@larskarbo.no");

var api_key = process.env.MAILGUN_API_KEY;
var domain = keystone.get('domain');
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var mailcomposer = require('mailcomposer');

exports.kontaktskjema = module.exports.kontaktskjema = function (req, res){
	var text = "";
	for(var key in req.body){
		var storBokstavKey = key.charAt(0).toUpperCase() + key.slice(1);
		text += storBokstavKey + ': ' + req.body[key] + '\n';
	}

	var html = "";
	for(var key in req.body){
		if(key == 'telefon'){
			html += 'Telefon: <a href="tel:' + req.body[key] + '">' + req.body[key] + '</a>'
		}else{
			var storBokstavKey = key.charAt(0).toUpperCase() + key.slice(1);
			html += storBokstavKey + ': ' + req.body[key] + '\n';
		}
	}

	var mail = mailcomposer({
		from: '"Kontaktskjema ['+req.body.namn+']" <' + keystone.get('@noreply') + '>',
		to: keystone.get('@contact'),
		subject: 'Melding fra: ' + req.body.namn,
		text: text,
		html: html
	});

	console.log(mail);
	mail.build(function(mailBuildError, message) {
	 
	    var dataToSend = {
	        to: keystone.get('@contact'),
	        message: message.toString('ascii')
	    };
	 
	    mailgun.messages().sendMime(dataToSend, function (sendError, body) {
	        if (sendError) {
	            console.log('sendError:', sendError);
				res.end(error);
	            return;
	        } else {
				res.end('success');
	        }
	    });
	});

	var mottatt = "Vi har mottatt din melding og vil komme med tilbakemelding så fort som mulig. \n\n ---- \n\n"
	mailgun.messages().send({
		from: '"Kontaktskjema ['+req.body.namn+']" <' + keystone.get('@noreply') + '>',
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