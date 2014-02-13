
	module.exports = {

		index: function (req, res, next) {
			req.trackPage('index');
			res.render('index.twig', res.data);
		}
	};