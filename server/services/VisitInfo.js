
var VisitInfo = function() {};
var sql = require('mssql');




VisitInfo.prototype.exec = function (data, cp){

	return new Promise((resolve,reject)=>{
		var request = new sql.Request(cp);
		request.input('date', sql.DateTime, new Date(data.date));
		request.input('id', sql.Int, data.id);
		request.input('isReject', sql.Int, data.isReject ? 1 : 0);
		request.input('lg', sql.Float, data.lg);
		request.input('ln', sql.Float, data.ln);
		request.input('reject', sql.NVarChar(400), data.reject);
	

		return request.execute('web.INS_VISIT')
			.then(() =>{
		        resolve("succes");
			}).
			catch(errr=>{
				reject(errr);
			});

	})
	
};

module.exports = new VisitInfo();


