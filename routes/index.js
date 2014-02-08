
	var app 		= require('neasy');
	var controller 	= require('../controllers/reservaspadel.js');
	var city 		= require('../controllers/city.js');

	app.get('/', controller.index);
	app.post('/places', city.getPlaces);