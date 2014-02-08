
	var Place = require('../models/place');
	var db 	= require('neasy/lib/db.js');

	module.exports = {

		getPlaces: function (req, res, next) {	
			db.find('places', {'city.title': new RegExp(req.body.city, 'i')}, function(err, places) {
				if (err) console.log(err);
				res.render('places.twig', {places: places});
			});
		}

	};