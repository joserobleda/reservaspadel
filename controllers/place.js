
	var app 		= require('neasy');
	var Q			= app.require('q');
	var Place 		= require('../models/place');
	var maps 		= require('../lib/maps.js');


	Place.getPlaces = function (req, res, next) {
		var city 	= req.body.city;
		var search 	= {'city.title': new RegExp(city, 'i')};
		var coords 	= req.body.coords;
		var places 	= Place.find(search);

		req.trackEvent('submit', city);

		if (coords) {
			req.trackEvent('origin', coords.lat + ',' + coords.lng);

			// coords to compare
			coords = {
				latitude: coords.lat,
				longitude: coords.lng
			};
		}

		
		coords = coords ? coords : maps.getCoords(city);

		Q.all([places, coords]).spread(function (places, coords) {
			// called to sort
			places.comparator = function (place) {
				return place.get('distance').meters;
			};


			// create the distance prop
			places.each(function (place) {
				var distance = place.getDistance(coords);
				place.set('distance', distance);
			});

			// sort by distance
			places.sort();
			// render the view 
			res.render('places.twig', {places: places.toJSON().slice(0, 20), city: city});
		});

		

	};

	module.exports = Place;