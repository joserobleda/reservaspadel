
	var app		= require('neasy');
	var Model 	= require('neasy/model');
	var geolib 	= require('geolib');


	var Place = Model.extend({
		collection: 'places',

		getDistance: function (from) {
			var distance, meters, km, unit, readable;

			distance 	= geolib.getDistance(from, this.get('coords'));
			meters 		= Math.round(distance / 100);
			readable 	= meters;
			km 			= meters / 1000;
			unit 		= 'm';

			// better to read in km
			if (meters > 999) {
				unit = 'Km';
				readable = km;
			}

			return {
				meters: meters,
				km: km,
				readable: readable,
				unit: unit
			}
		}
	});

	Place.class = 'places';

	module.exports = Place;