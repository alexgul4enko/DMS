
var sql = require('mssql');

const actions = {
	

	userStatus :function (cp, user = {},connected =0){
		var request = new sql.Request(cp);
		request.input('ID', sql.Int, user.ID);
		request.input('ACT', sql.Int, connected);
		request.execute('web.UPD_USER_ACTIVE')
			.then(data=>{

			})
			.catch(err=>{
				console.log(err);
			})
	},
	userGeo: function (cp, userID = -1,LAT = 0, LNG = 0){
		var request = new sql.Request(cp);
		request.input('ID', sql.Int, userID);
		request.input('LAT', sql.Float, LAT);
		request.input('LNG', sql.Float, LNG);
		request.execute('web.UPD_USER_GEO')
			.then(data=>{

			})
			.catch(err=>{
				console.log(err);
			})
	},
	saveOrder: function (cp,order ={},UserLogin='',socket,glSocket){
		let orderTable = new sql.Table();
		orderTable.columns.add('OrderID', sql.VarChar(100));
		orderTable.columns.add('Manager', sql.VarChar(100));
		orderTable.columns.add('TTID', sql.BigInt);
		orderTable.columns.add('RouteID', sql.BigInt);
		orderTable.columns.add('CreateDate', sql.VarChar(100));
		orderTable.columns.add('deliveryType', sql.Int);
		orderTable.columns.add('ln', sql.Float);
		orderTable.columns.add('lg', sql.Float);
		orderTable.columns.add('Comment', sql.NVarChar(500));
		orderTable.columns.add('PayFormID', sql.Int);
		orderTable.columns.add('ProdId', sql.Int);
		orderTable.columns.add('P_Discount', sql.Float);
		orderTable.columns.add('P_QTY', sql.Float);
		orderTable.columns.add('P_SUM', sql.Float);
		orderTable.columns.add('P_SUMD', sql.Float);
		orderTable.columns.add('T_QTY', sql.Float);
		orderTable.columns.add('T_SUM', sql.Float);
		orderTable.columns.add('T_SumD', sql.Float);

		const {MId,RID,comment,date,delivery,id,ln,lg,payForm,prods,qty,sum,sumDisc} = order;
		const DATE = new Date(date);
		const sqlDate = `${DATE.getYear()+1900}-${
			DATE.getMonth()+1<10?'0':''}${DATE.getMonth()+1}-${
			DATE.getDate()<10?'0':''}${DATE.getDate()} ${
			DATE.getHours()<10?'0':''}${DATE.getHours()}:${
			DATE.getMinutes()<10?'0':''}${DATE.getMinutes()}:${
			DATE.getSeconds()<10?'0':''}${DATE.getSeconds()}.000`
		// 2016-12-23 10:06:40.200

		if(prods && prods.length){
			prods.map(ord=>{
				const {disc,id:prID, qty:prQYU, sum:prSum, sumD : prSumDisc} = ord;
				if(prQYU){
					orderTable.rows.add(id,UserLogin,MId,RID,sqlDate,delivery,ln,lg,
							comment,payForm,prID,disc,prQYU,prSum,prSumDisc
							,qty,sum,sumDisc);
				}
					
			})
		}

		let request = new sql.Request(cp);
		request.input('order', orderTable);
		request.execute('web.INS_ORDER')
			.then(()=>{
				socket.emit('Order_saved',id);
				let whTr = new sql.Request(cp);
				whTr.input('OrderID',  id);
				whTr.input('RouteID',  RID);
				whTr.execute('web.GET_CHANGEDSTOCKS')
					.then(wh=>{
						if(wh && wh[0]){
							glSocket.emit('WH_CHANGED',wh[0]);
						}
					})
					.catch(err=>{
						console.log(err);
					}) 


			})
			.catch(err=>{
				console.log(err.message);
				
			})

		let tr = new sql.Request(cp);
		tr.input('TRANSITION',  'INSERT_ORDER');
		tr.input('ORDERID',  id);
		tr.input('JSON', JSON.stringify(order) );

		tr.execute('web.INS_TRANSITIONS')
			.then(data=>{
				// console.log('transition saved')
			})
			.catch(err=>{
				console.log(err);
			}) 

	},

	deleteOrder: (cp,OrderID, RID,socket,glSocket)=>{
		let deltr = new sql.Request(cp);
		deltr.input('OrderId',  OrderID);
		deltr.input('RouteID',  RID);
		deltr.execute('web.DEL_ORDER')
			.then(data=>{
				socket.emit("GET_BACK_YOUR_ORDER",OrderID);
				if(data && data[0] && data[0].length){
					glSocket.emit('WH_CHANGED',data[0]);
				}
			})
			.catch(err=>{
				console.log(err);
			})

		let tr = new sql.Request(cp);
		tr.input('TRANSITION',  'DELETE_ORDER');
		tr.input('ORDERID',  OrderID);
		tr.input('JSON', '' );

		tr.execute('web.INS_TRANSITIONS')
			.then(data=>{
				// console.log('transition saved')
			})
			.catch(err=>{
				console.log(err);
			}) 

	}
}







module.exports = actions;