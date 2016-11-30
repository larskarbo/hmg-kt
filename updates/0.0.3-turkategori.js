var keystone = require('keystone');
var Kategori = keystone.list('TurKategori');
var async = require('async')

module.exports = function (done) {

	var kat = ['Sommarturar','Vinterturar','Familieturar', 'Arrangement']

	async.each(kat, function(element, callback){
		Kategori.model.findOne({
			tittel: element
		})
		.count()
		.exec(function(err,count){
			if(count < 1){
				new Kategori.model({
					tittel: element
				})
				.save(callback);
			}else{
				callback()
			}
		})

	}, done)

};