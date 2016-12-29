
var Stocks = function() {};
var sql = require('mssql');




Stocks.prototype.exec = function (data =[], cp){

	return new Promise((resolve,reject)=>{
		let stocksTable = new sql.Table();
		stocksTable.columns.add('RouteID', sql.Int);
		stocksTable.columns.add('ProductId', sql.Int);
		stocksTable.columns.add('QTY', sql.Float);

		data.map(ans=>{
			let {pr, qty, rid} = ans;
			
			pr = parseInt(pr);
			rid = parseInt(rid);
			qty = parseFloat(qty);
			stocksTable.rows.add(rid,pr,qty);
		})

		let request = new sql.Request(cp);
		request.input('stocks', stocksTable);
		return request.execute('web.INS_STOCKS')
			.then(()=>{
				resolve("succes");
			})
			.catch(err=>{
				reject(err);
			})

	})
	
};

module.exports = new Stocks();


