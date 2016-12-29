const authOnly = require('./OuthOnly');

module.exports = function(app,cp) {
	const api = require('./api/routes')(app,cp);
	app.use('/api', authOnly, api);
};
