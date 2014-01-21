
	var app 		= require('neasy');
	var controller 	= require('../controllers/default.js');



	app.get('/', controller.index);
	app.get('/:default', controller.show);