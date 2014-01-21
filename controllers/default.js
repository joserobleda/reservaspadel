

	module.exports = {

		index: function (req, res, next) {
			res.end('Index!');
		},

		show: function (req, res, next) {
			res.end('Show!');
		}
	};