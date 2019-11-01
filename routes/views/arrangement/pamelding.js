var formidable = require('formidable');
var util = require('util');
var keystone = require('keystone');
var Faktura = keystone.list('Faktura');
var PlanTur = keystone.list('PlanTur');

keystone.set("domain", "hjorundfjordmountainguide.no");
keystone.set("@noreply", "noreply@hjorundfjordmountainguide.no");
keystone.set("@faktura", "faktura@hjorundfjordmountainguide.no");
keystone.set("@contact", "kontakt@hjorundfjordmountainguide.no");


var api_key = process.env.MAILGUN_API_KEY;
var domain = keystone.get('domain');
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
var mailcomposer = require('mailcomposer');


/**
 * Når påmelding:
 * 
 *  * (sjekke om det er nok ledige plasser)?
 *  * lage ny faktura
 *  * sende eposter
 *  * endre ledige plassa
 */

exports = module.exports = function (req, res) {
	// lage ny faktura

	// console.log({
	// 	name: req.body.name,
	// 	description: req.body.description,
	// 	title: req.body.title,
	// 	tripDate: new Date(),//req.body.tripDate,
	// 	amount: req.body.amount,
	// })

	var newFaktura = new Faktura.model({
		name: req.body.name,
		description: req.body.description,
		title: `(${req.body.antall} stk) ${req.body.title}`,
		tripDate: new Date(),//req.body.tripDate,
		amount: req.body.amount,
	});

	newFaktura.save(function (err, faktura) {
		console.log('faktura has been created')
		const link = 'https://hjorundfjordmountainguide.no/faktura/' + faktura._doc.link

		// steg nr 2, sende eposter

		const text = req.body.description + `\n\nLink til faktura: ${link}`
			+ `\n\n Ved spørsmål, vennligst ta kontakt med oss på ${keystone.get('@contact')}`
		mailgun.messages().send({
			from: keystone.get('@noreply'),
			to: "larskarbo@hotmail.com",
			subject: req.body.title,
			text: text
		}, function (error, body) {
			console.log('error: ', error);


			// steg nr 3, dekrement counter
				PlanTur.model.findOne({ slug: req.body.arrstr }, 'plassar').lean().exec(function (err, ja) {
				const opptatteplassarno = ja.plassar.opptatte * 1
					PlanTur.model.update({ slug: req.body.arrstr }, {
						plassar: {
							totalt: ja.plassar.totalt * 1,
							opptatte: opptatteplassarno * 1 + req.body.antall * 1,
							ledige: ja.plassar.totalt * 1 - (opptatteplassarno * 1 + req.body.antall * 1)
						}
					}, function (err, tank) {
					if (err) return console.log(err);
					// Now `otherTank` is a copy of `tank`
					console.log('nice!')
							return res.send({
								link,
								success: 'true',
								epost: req.body.epost
					})
				})
				})
				
				mailgun.messages().send({
					from: keystone.get('@noreply'),
					to: keystone.get('@contact'),
					subject: `(${req.body.antall} stk) ${req.body.title}`,
					text: text
				}, function (error, body) {
					console.log('error: ', error);


					// steg nr 3, dekrement counter
					PlanTur.model.findOne({ slug: req.body.arrstr }, 'plassar').lean().exec(function (err, ja) {
						const opptatteplassarno = ja.plassar.opptatte

						PlanTur.model.update({ slug: req.body.arrstr }, {
							plassar: {
								totalt: ja.plassar.totalt,
								opptatte: opptatteplassarno + req.body.antall,
								ledige: ja.plassar.totalt - (opptatteplassarno + req.body.antall)
							}
						}, function (err, tank) {
							if (err) return console.log(err);
							// Now `otherTank` is a copy of `tank`
							console.log('nice!')
							return res.send({
								link,
								success: 'true',
								epost: req.body.epost
							})
						})
					})


				});


		});

	});
}
