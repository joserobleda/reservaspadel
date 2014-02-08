
	var City = require('../models/city');
	var db 	= require('neasy/lib/db.js');

	module.exports = {

		getPlaces: function (req, res, next) {
			var data = {};
	
			db.find('places', {'city.title': req.body.city}, function(err, places) {
				if (err) console.log(err);
				res.render('places.twig', {places: places});
			});
		}

	};