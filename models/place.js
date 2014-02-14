
	var app		= require('neasy');
	var Model 	= require('neasy/model');
	var geolib 	= require('geolib');


	var Place = Model.extend({
		getDistance: function (from) {
			var to = this.get('coords');

			console.log("to:" + to);

			return geolib.getDistance(from, to);
		}
	});

	Place.class = 'places';


	// map the method
	// Place.getDistance = geolib.getDistance;

	module.exports = Place;