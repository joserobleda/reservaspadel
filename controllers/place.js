
	var Place 		= require('../models/place');


	Place.getPlaces = function (req, res, next) {
		var city 	= req.body.city;
		var search 	= {'city.title': new RegExp(city, 'i')};
		var coords 	= req.body.coords;

		req.trackEvent('submit', city);

		if (coords) {
			req.trackEvent('origin', coords.lat + ',' + coords.lng);
		} else {
			return next('no coords');
		}


		// coords to compare
		coords = {
			latitude: parseInt(coords.lat, 10),
			longitude: parseInt(coords.lng, 10)
		};


		Place.find(search).then(function (places) {
			
			// called to sort
			places.comparator = function (place) {
				return place.get('distance').meters;
			};

			// create the distance prop
			places.each(function (place) {
				var distance = place.getDistance(coords);
				place.set('distance', { meters: distance });
			});

			// sort by distance
			places.sort();


			// render the view 
			res.render('places.twig', {places: places.toJSON(), city: city});
		});

	};

	module.exports = Place;