
	var Place 		= require('../models/place');
	var db 			= require('neasy/lib/db.js');
	var distance 	= require('google-distance');
	var async 		= require('async');

	module.exports = {

		getPlaces: function (req, res, next) {	
			var self = this;

			db.find('places', {'city.title': new RegExp(req.body.city, 'i')}, function(err, places) {
				if (err) {
					console.error(err);
					return;
				}
				async.forEach(places, function(place, cb) {
					if (typeof place.address !== 'undefined') {
						distance.get({
							units: 'metric',
							origin: req.body.lat + ',' + req.body.lng, 
							destination: place.address + " " + req.body.city
						}, function(err, data) {
							if (err) cb(err);

							if (typeof data !== 'undefined') {
								place.distance = data.distance;
								 cb(null);
							} else {
								cb(null);
							}
						});

					} else {
						cb(null);
					}

				}, function(err) {

					places.sort(function (a,b) {
						if (a.distance < b.distance)
							return -1;
						if (a.distance > b.distance)
							return 1;
						return 1;
					});

					res.render('places.twig', {places: places});
				});
			});
		}
	};