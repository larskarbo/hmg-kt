var keystone = require('keystone');
var Preset = keystone.list('Preset');
var async = require('async')

module.exports = function (done) {

	var kat = ['Standard Turmal']

	async.each(kat, function(element, callback){
		Preset.model.findOne({
			tittel: element,
			__ref: element
		})
		.count()
		.exec(function(err,count){
			if(count < 1){
				new Preset.model({
					tittel: element
				})
				.save(callback);
			}else{
				callback()
			}
		})

	}, done)

};