var formidable = require("formidable");
var util = require("util");

var keystone = require("keystone");

keystone.set("domain", "hjorundfjordmountainguide.no");
keystone.set("@noreply", "noreply@hjorundfjordmountainguide.no");
keystone.set("@faktura", "faktura@hjorundfjordmountainguide.no");
keystone.set("@contact", "kontakt@hjorundfjordmountainguide.no");

var Recaptcha = require("recaptcha-verify");
var recaptcha = new Recaptcha({
	secret: process.env.RECAPTCHA_KEY,
	verbose: true
});

var api_key = process.env.MAILGUN_API_KEY;
var domain = keystone.get("domain");
var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });
var mailcomposer = require("mailcomposer");

exports.kontaktskjema = module.exports.kontaktskjema = function(req, res) {
	var text = "";
	//g-recaptcha-response
	recaptcha.checkResponse(req.body["g-recaptcha-response"], function(error, response) {
		if (error) {
			// an internal error?
			res.status(400).render("400", {
				message: error.toString()
			});
			return;
		}
		if (response.success) {
			for (var key in req.body) {
				if (key == "g-recaptcha-response") {
					continue;
				}
				var storBokstavKey = key.charAt(0).toUpperCase() + key.slice(1);
				text += storBokstavKey + ": " + req.body[key] + "\n";
			}

			var html = "";
			for (var key in req.body) {
				if (key == "telefon") {
					html += `<b>Telefon:</b> <a href="tel:${req.body[key]}"> ${req.body[key]} </a> <br />`;
				} else {
					var storBokstavKey = key.charAt(0).toUpperCase() + key.slice(1);
					html += `<b>${storBokstavKey}:</b> ${req.body[key]} <br />`;
				}
			}

			var mail = mailcomposer({
				from:
					'"Kontaktskjema [' +
					req.body.namn +
					']" <' +
					keystone.get("@noreply") +
					">",
				to: keystone.get("@contact"),
				subject: "Melding fra: " + req.body.namn,
				text: text,
				html: html
			});

			console.log(mail);
			mail.build(function(mailBuildError, message) {
				var dataToSend = {
					to: keystone.get("@contact"),
					message: message.toString("ascii")
				};

				mailgun.messages().sendMime(dataToSend, function(sendError, body) {
					if (sendError) {
						console.log("sendError:", sendError);
						res.end(error);
						return;
					} else {
						res.end("success");
					}
				});
			});

			var mottatt =
				"Vi har mottatt din melding og vil komme med tilbakemelding så fort som mulig. \n\n ---- \n\n";
			mailgun.messages().send(
				{
					from:
						'"Kontaktskjema [' +
						req.body.namn +
						']" <' +
						keystone.get("@noreply") +
						">",
					to: req.body.epost,
					subject: "Melding mottatt",
					text: mottatt + text
				},
				function(error, body) {}
			);
		} else {
			res.status(200).send("the user is a ROBOT :(");
			// show warning, render page, return a json, etc.
		}
	});
};

exports.sendMail = function(data, callback) {
	mailgun.messages().send(data, function(error, body) {
		callback(error, body);
	});
};

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
