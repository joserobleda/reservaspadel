
	var app		= require('neasy');
	var request = app.require('request');
	var Q 		= app.require('q');

	exports.getCoords = function(address, callback) {
		var url, coords, deferred;
		
		url 		= 'http://maps.google.com/maps/api/geocode/json?address='+ encodeURIComponent(address) + '&sensor=false';
		coords 		= {};
		deferred 	= Q.defer();

		request({url: url, json: true}, function (err, response, body) {

			if (err) return deferred.reject(new Error(err));

			if (body.results[0]) {
				coords = {
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				};
			}

			deferred.resolve(coords);
		});

		return deferred.promise;
	}