
	var app 		= require('neasy');
	var controller 	= require('../controllers/reservaspadel.js');
	var place 		= require('../controllers/place.js');
	
	app.get('/', controller.index);
	app.post('/places', place.getPlaces);