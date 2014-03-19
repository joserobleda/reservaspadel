
	var app 		= require('neasy');
	var Q			= app.require('q');
	var Place 		= require('../models/place');
	var maps 		= require('../lib/maps.js');


	Place.getPlaces = function (req, res, next) {
		var search, hasCoords, places, city, coords;


		city 		= req.body.city;		
		coords 		= req.body.coords

		req.trackEvent('submit', city);

		if (coords) {
			hasCoords = true;

			req.trackEvent('origin', coords.lat + ',' + coords.lng);

			// coords to compare
			coords = {
				latitude: parseFloat(coords.lat),
				longitude: parseFloat(coords.lng)
			};

			search = {
				point: { 
					$near: [coords.latitude, coords.longitude],
					$maxDistance: 10000
				},

			};

		} else {
			hasCoords 	= false;
			search 		= {'city.title': new RegExp(city, 'i')};
		}


		var places = Place.find(search).fail(function (err) {
			console.log(err);
		});

		
		coords = coords ? coords : maps.getCoords(city);

		Q.all([places, coords]).spread(function (places, coords) {
			// create the distance prop
			places.each(function (place) {
				var distance = place.getDistance(coords);
				place.set('distance', distance);
			});

			
			// called to sort
			places.comparator = function (place) {
				return place.get('distance').meters;
			};


			places.sort();
			

			// render the view 
			res.render('places.twig', {places: places.toJSON().slice(0, 20), city: city, hasCoords: hasCoords});
		});

		

	};

	module.exports = Place;