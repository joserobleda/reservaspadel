
	var qs 		= require('querystring');
	var https 	= require('https');


	exports.get = function(args, callback) {
		var options = {
			index: args.index || null,
			origins: args.origin,
			destinations: args.destination,
			mode: args.mode || 'driving',
			units: args.units || 'imperial',
			language: args.language || 'en',
			avoid: args.avoid || null,
			sensor: args.sensor || false,
			key: 'AIzaSyAmbXq8KeJgDXoUTdpCyr7K-n3mrKBpPMg'
		};

		if (!options.origins) {return callback(new Error('Argument Error: Origin is invalid'))}
		if (!options.destinations) {return callback(new Error('Argument Error: Destination is invalid'))}
			
		request(options, function(err, result) {
			if (err) {
				return callback(null, null);
			}
			var data = result;

			if (data.status != 'OK') {
				return callback(null, null);
			}

			if (data.rows[0].elements[0].status == 'ZERO_RESULTS') {
				return callback(null, null);
			}

			var d = {
				distance: data.rows[0].elements[0].distance.text,
				value: data.rows[0].elements[0].distance.value,
			};

			return callback(null, d);
		});	
	}


	var request = function(options, callback) {
		var httpOptions = {
		  	host: 'maps.googleapis.com',
		  	path: '/maps/api/distancematrix/json?' + qs.stringify(options)
		};

		var requestCallback = function(res) {
		  	var json = '';

		  	res.on('data', function (chunk) {
		    	json += chunk;
		    	callback(null, JSON.parse(json));
		  	});
		}	

		var req = https.request(httpOptions, requestCallback);
		req.on('error', function(err) {
	 	 	callback(new Error('Request error: ' + err.message));
		});
		req.end();
	}