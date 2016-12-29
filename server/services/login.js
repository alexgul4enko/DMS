
var async = require('async');
var LoginService = function() {};
var sql = require('mssql');

LoginService.prototype.check = function (data, cp, callback){
	async.parallel([
		(callback) => {
			this.exec(data, cp, (err, data_) => {
				if(err){
					 callback(err, null);
				};
				 callback(null, data_);
			});
		}
		
	], 
	(err, result) =>{
		return callback(err, result);
	});
};


LoginService.prototype.exec = function (data, cp, callback){
	var request = new sql.Request(cp);

	request.input('login', sql.VarChar(50), data.login);
    request.input('pass', sql.VarChar(50), data.pass);
    request.execute('web.getLogin').then(function(data_) {
        if(!data_[0].length){
        	callback("empty", null);
        	return;
        }
        callback(null, data_[0][0]);
    }).catch(function(err) {
       callback(err, null);
    });


      
};

module.exports = new LoginService();