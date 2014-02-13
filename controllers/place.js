
	var Place 		= require('../models/place');
	var db 			= require('neasy/lib/db.js');
	var distance 	= require('../lib/distance.js');
	var async 		= require('async');

	Place.getDuration = function (origin, destination, cb) {
		distance.get({
			units: 'metric',
			origin: origin,
			destination: destination
		}, function(err, data) {
			if (err) cb(null, null);

			if (data) {
				cb(null, data.distance, data.value);
			} else {
				cb(null, null);
			}
		});
		
	};

	Place.getPlaces = function (req, res, next) {
		var self = this, city, distance, origin, destination;

		city = req.body.city;

		// track in ga
		req.trackEvent('submit', city);
		
		if (req.body.coords) {
			origin 	= req.body.coords.lat + ',' + req.body.coords.lng;
			req.trackEvent('origin', origin);
		} else {
			origin 	= city;
		}



		db.find('places', {'city.title': new RegExp(req.body.city, 'i')}, function(err, places) {
		
			if (err) {
				return console.error(err);
			}


		
			async.forEach(places, function (place, cb) {
				
				if (typeof place.address !== 'undefined') {
					
					destination = place.address + " " + city;

					Place.getDuration(origin, destination, function (err, distance, value) {
						if (distance && value) {
							place.distance 	= distance;
							place.value 	= value;

							cb(null);
						} else {
							cb(null);
						}
					});
							
				} else {
					cb(null);
				}

			}, function(err) {
				async.sortBy(places, function(place, callback){
					callback(null, place.value);
				}, function(err, results){
					res.render('places.twig', {places: results ,city: req.body.city});
				});

			});
		});
	};

	module.exports = Place;