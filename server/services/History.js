
var async = require('async');
var History = function() {};
var sql = require('mssql');

History.prototype.init = function (data, cp, callback){
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


History.prototype.exec = function (data, cp, callback){
	var request = new sql.Request(cp);

	request.input('login', sql.VarChar(50), data.login);
    request.input('pass', sql.VarChar(50), data.pass);
    request.execute('web.GET_LAST4ORDERS').then(function(data_) {
        if(!data_[0].length){
        	callback("empty", null);
        	return;
        }
        callback(null, data_[0]);
    }).catch(function(err) {
       callback(err, null);
    });


      
};

module.exports = new History();