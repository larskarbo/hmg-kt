var keystone = require('keystone');
var Side = keystone.list('Side');
var async = require('async')

module.exports = function (done) {

	var sider = ['Kontakt','Om oss','Overnatting','Samarbeidspartnarar']

	async.each(sider, function(side, callback){
		Side.model.findOne({
			tittel: side
		})
		.count()
		.exec(function(err,count){
			if(count < 1){
				new Side.model({
					tittel: side
				})
				.save(callback);
			}else{
				callback()
			}
		})

	}, done)

};