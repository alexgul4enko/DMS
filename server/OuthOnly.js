module.exports = function (req, res, next) {
	
	res.callback = (err, data) => {
		if (err) {
			return res.status(err.status || 500).send({
				message: err.message 
			});
		}
		return res.status(200).send(data);
	};

	res.forbidden = (message) => {
		var err = new Error(message || 'Access denied');
		err.status = 403;

		return res.callback(err);
	};

	res.badRequest = (message) => {
		var err = new Error(message || 'Bad request');
		err.status = 400;

		return res.callback(err);
	};

	res.unauthorized = (message) => {
		var err = new Error(message || 'Unauthorized');
		err.status = 401;

		return res.callback(err);
	}

	next();
};