var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'heim';

	locals.metaDesc ="Vi tek på oss guiding på mange av dei mest kjende fjella på Sunnmøre både sommar og vinter. Vi skreddarsyr turar til deg. Alt frå overnatting, mat og turopplegg. Ta kontakt for meir informasjon om vårt opplegg. Vår målsetjing er: Fremje kultur, busetnad og fjellsport i Hjørundfjord"

	view.query('post', keystone.list('Side').model.findOne({slug:'heim'}));
	view.query('partnarar', keystone.list('Sponsor').model.find().sort('sortOrder'));
	
	// view.query('guidar', keystone.list('Guide').model.find().sort('sortOrder'));
	// view.query('eksempeltur', keystone.list('Tur').model.findOne({'bilde.url': {$ne: ""}}))
	// view.query('eksempelarr', keystone.list('PlanTur').model.findOne({'bilde.url': {$ne: ""}}))
// 
	// Render the view
	view.render('index');
};