
var TTProdActions = function() {};
var sql = require('mssql');




TTProdActions.prototype.exec = function (data =[], cp){
	return new Promise((resolve,reject)=>{
		let ttAnswer = new sql.Table();
		ttAnswer.columns.add('ActKey', sql.VarChar(100));
		ttAnswer.columns.add('ProdId', sql.VarChar(100));
		ttAnswer.columns.add('ActId', sql.VarChar(100));
		ttAnswer.columns.add('Date', sql.VarChar(100));
		ttAnswer.columns.add('ln', sql.Float);
		ttAnswer.columns.add('lg', sql.Float);
		ttAnswer.columns.add('Answer', sql.NVarChar);

		data.map(ans_=>{
			let {ans,data,id,ln,lg,prodId,actID} = ans_;

			const DATE = new Date(data);
			const sqlDate = `${DATE.getYear()+1900}-${
				DATE.getMonth()+1<10?'0':''}${DATE.getMonth()+1}-${
				DATE.getDate()<10?'0':''}${DATE.getDate()} ${
				DATE.getHours()<10?'0':''}${DATE.getHours()}:${
				DATE.getMinutes()<10?'0':''}${DATE.getMinutes()}:${
				DATE.getSeconds()<10?'0':''}${DATE.getSeconds()}.000`
			id = parseInt(id);
			if(!ans){ans = ''}
			ttAnswer.rows.add(id,prodId,actID,sqlDate,ln,lg,ans);
		})


		let request = new sql.Request(cp);
		request.input('answers', ttAnswer);
		return request.execute('web.INS_TT_PROD_ANSWERS')
			.then((data)=>{
				resolve("succes");
			})
			.catch(err=>{
				reject(err);
			})

	})
	
};

module.exports = new TTProdActions();


