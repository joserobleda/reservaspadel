
	module.exports = {

		index: function (req, res, next) {
			res.render('index.twig', res.data);
		}
	};