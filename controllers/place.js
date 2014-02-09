
	var Place 		= require('../models/place');
	var db 			= require('neasy/lib/db.js');
	var distance 	= require('google-distance');
	var async 		= require('async');

	Place.getDuration = function (coords, address, city, cb) {
		distance.get({
			units: 'metric',
			origin: coords.lat + ',' + coords.lng, 
			destination: address + " " + city
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
		var self, distance, coords;

		self = this;

		db.find('places', {'city.title': new RegExp(req.body.city, 'i')}, function(err, places) {
		
			if (err) {
				console.error(err);
				return;
			}
		
			async.forEach(places, function (place, cb) {
				
				if (typeof place.address !== 'undefined') {
					coords = {
						lat: req.body.lat,
						lng: req.body.lng
					}

					Place.getDuration(coords, place.address, req.body.city, function (err, distance) {
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

				places.sort( function (a,b) {
					if (a.distance < b.distance)
						return -1;
					if (a.distance > b.distance)
						return 1;
					return 1;
				});

				res.render('places.twig', {places: places});

			});
		});
	};

	module.exports = Place;