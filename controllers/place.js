
	var Place 		= require('../models/place');
	var db 			= require('neasy/lib/db.js');
	var distance 	= require('google-distance');
	var async 		= require('async');

	Place.getDuration = function (origin, destination, cb) {
		distance.get({
			units: 'metric',
			origin: origin,
			destination: destination
		}, function(err, data) {
			if (err) cb(null, null);
			
			if (typeof data !== 'undefined') {
				cb(null, data.distance);
			} else {
				cb(null, null);
			}
		});
	};

	Place.getPlaces = function (req, res, next) {
		var self, distance, origin, destination;

		self = this;

		db.find('places', {'city.title': new RegExp(req.body.city, 'i')}, function(err, places) {
		
			if (err) {
				console.error(err);
				return;
			}
		
			async.forEach(places, function (place, cb) {
				
				if (typeof place.address !== 'undefined') {

					if (req.body.lat && req.body.lng) {
						origin 	= req.body.lat + ',' + req.body.lng;
					} else {
						origin 	= req.body.city;
					}
					
					destination = place.address + " " + req.body.city;

					Place.getDuration(origin, destination, function (err, distance) {
						if (distance) {
							place.distance = distance;
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
					callback(null, place.distance);
				}, function(err, results){
					res.render('places.twig', {places: results});
				});

			});
		});
	};

	module.exports = Place;