
	var app = require('neasy');

	app.get('/', function (req, res) {
		res.render('index.twig', []);
	})


	app.get('/:default',  function (req, res) {
		res.send('Hi! ' + req.query['default']);
	});