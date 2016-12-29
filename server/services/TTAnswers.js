
var TTAnswers = function() {};
var sql = require('mssql');




TTAnswers.prototype.exec = function (data =[], cp){
	return new Promise((resolve,reject)=>{
		let ttAnswer = new sql.Table();
		ttAnswer.columns.add('AnsID', sql.VarChar(100));
		ttAnswer.columns.add('Date', sql.VarChar(100));
		ttAnswer.columns.add('ln', sql.Float);
		ttAnswer.columns.add('lg', sql.Float);
		ttAnswer.columns.add('Answer', sql.NVarChar);
		ttAnswer.columns.add('isReject', sql.Int);

		data.map(ans_=>{
			let {ans,data,id,ln,lg,reject} = ans_;
			const DATE = new Date(data);
			const sqlDate = `${DATE.getYear()+1900}-${
				DATE.getMonth()+1<10?'0':''}${DATE.getMonth()+1}-${
				DATE.getDate()<10?'0':''}${DATE.getDate()} ${
				DATE.getHours()<10?'0':''}${DATE.getHours()}:${
				DATE.getMinutes()<10?'0':''}${DATE.getMinutes()}:${
				DATE.getSeconds()<10?'0':''}${DATE.getSeconds()}.000`
			id = parseInt(id);
			reject = reject? 1:0;
			if(!ans){ans = ''}
			ttAnswer.rows.add(id,sqlDate,ln,lg,ans,reject);
		})


		let request = new sql.Request(cp);
		request.input('answers', ttAnswer);
		return request.execute('web.INS_TTANSWERS')
			.then((data)=>{
				resolve("succes");
			})
			.catch(err=>{
				reject(err);
			})

	})
	
};

module.exports = new TTAnswers();


