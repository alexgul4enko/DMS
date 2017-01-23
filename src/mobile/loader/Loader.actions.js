import Constances from './Constances';
import getArrData from '../localStore/getArrData';
import HttpPromice from '../HttpPromice';
import ClearTable from '../localStore/ClearTable';

export default {
	clearStage:()=>{
		return {
			type: Constances.CLEAR_LOADING,
		}
	},
	startLoad:()=>{
		return (dispatch,getState)=>{
			dispatch(start());
			let imagesObj = {};
			let counte = counter();
			getArrData("Images")
				.then(images=>{
					dispatch(imagesFound(images.length));
					let co = images.length;
					images.map(imm=>{
						const {data, id} = imm;
						HttpPromice("/Images","POST",imm)
							.then(st=>{
								const {id:imgID , path} = st;
								imagesObj = {...imagesObj, [imgID]:path};
								co--;
								if(co==0){
									setTimeout(()=>{
										dispatch(addTitleForStocks());
										sendStocks(dispatch,counte);
											setTimeout(()=>{
												dispatch(addActinsTitle());
												sendAnswers(dispatch,imagesObj,counte)
												setTimeout(()=>{
													dispatch(addProductsActionsTitle());
													sendProdAnswers(dispatch,imagesObj,counte);
												},500);
											},500)
									},500)

								}
								dispatch(minusImage());
							})
							.catch(errr=>{
								dispatch(minusImage());
							})
					})
					if (!images || !images.length){
						setTimeout(()=>{
										dispatch(addTitleForStocks());
										sendStocks(dispatch,counte);
											setTimeout(()=>{
												dispatch(addActinsTitle());
												sendAnswers(dispatch,imagesObj,counte)
												setTimeout(()=>{
													dispatch(addProductsActionsTitle());
													sendProdAnswers(dispatch,imagesObj,counte);
												},500);
											},500)
									},500)
					}
				})
				.catch(err=>{
					console.log(err);
				})
		}

	}
}


const sendProdAnswers = (dispatch,imgObj,isDone) =>{
	return new Promise((resolve,reject)=>{

		getArrData("ProductAnswers")
			.then(answers=>{

				if(!answers){
					dispatch(answersProdLoadet())
					console.log("ANSWERS STOCK");
				}
				else{
					let ansArr=[];
					answers.map(answer=>{
						let {id, obj} = answer;
						id = parseInt(id);
						for (let prodId in obj){
							let productAnswers = obj[prodId];
							if(productAnswers){
								for (let actID in productAnswers){
									let {answer, date, ln,lg} = productAnswers[actID]||{}
									if(!date && answer && Array.isArray(answer)){
										answer.map(photoAnswer=>{
											let {date, ln,lg,imgID} =photoAnswer; 
											ansArr.push({
														ans:imgObj[imgID+""],
														data:date,ln,lg,
														actID,
														prodId,
														id
													})
										})
									}
									else{
										ansArr.push({
														ans:answer,
														data:date,ln,lg,
														actID,
														prodId,
														id
													})
									}
								}
							}
						}

					})


					HttpPromice("/api/TTProdActions","post",ansArr)
					.then(d=>{
						ClearTable("ProductAnswers");
						let co = isDone();
						if(co ==3){
							setTimeout(()=>{dispatch(loaderDoneJob())},500)
						}
						dispatch(answersProdLoadet())
						
					})
					.catch (err=>{
						ClearTable("ProductAnswers");
						let co = isDone();
						if(co ==3){
							setTimeout(()=>{dispatch(loaderDoneJob())},500)
						}
						dispatch(answersProdLoadet())
						
					})
				}
			})
			.catch(err=>{
				console.log(err);

			})
	})
}



const counter = ()=>{
	let co=0;
	return function (){
		return ++co;
	}
}

const sendStocks=(dispatch,isDone)=>{
	return new Promise((resolve,reject)=>{
		getArrData("Stocks")
			.then(stocks=>{
				if(!stocks){
					console.log("DONE STOCK");
					dispatch(stocksLoaded());
				}
				else{
					let stocksArr =[];
					stocks.map(st=>{
						const {id, data} = st;
						if (Number.isInteger(id) && data){
							for(let i in data){
								stocksArr.push({rid:id,pr:parseInt(i),qty:data[i]})
							}
						}
					})
					HttpPromice("/api/Stocks","post",stocksArr)
					.then(d=>{
						dispatch(stocksLoaded());
						ClearTable("Stocks");
						let co = isDone();
						if(co ==3){
							setTimeout(()=>{dispatch(loaderDoneJob())},500)
						}
					})
					.catch (err=>{
						dispatch(stocksLoaded());
						ClearTable("Stocks");
						let co = isDone();
						if(co ==3){
							setTimeout(()=>{dispatch(loaderDoneJob())},500)
						}
					})
				}
			})
			.catch(err=>{console.log(err);})
	})
}




const sendAnswers = (dispatch,imgObj,isDone) =>{
	return new Promise((resolve,reject)=>{

		getArrData("TTanswers")
			.then(answers=>{
				if(!answers){
					dispatch(answersLoadet())
					console.log("ANSWERS STOCK");
				}
				else{
					let ansArr=[];
					answers.map(answer=>{
						let {ans,data,id,ln,lg,reject} = answer;
						id = parseInt(id);
						if(ln && lg && data){
							ansArr.push({ans,data,id,ln,lg,reject})
						}
						else{
							if (ans && ans.length){
								ans.map(ph=>{
									let {date,imgID,ln,lg} = ph;
									ansArr.push({ans:imgObj[imgID+""],data:date,id,ln,lg,reject:false})
								})
							}
						}
					})
					HttpPromice("/api/TTAnswers","post",ansArr)
					.then(d=>{
						ClearTable("TTanswers");
						ClearTable("Images");
						let co = isDone();
						if(co ==3){
							setTimeout(()=>{dispatch(loaderDoneJob())},500)
						}
						dispatch(answersLoadet())
						
					})
					.catch (err=>{
						ClearTable("TTanswers");
						ClearTable("Images");
						let co = isDone();
						if(co ==3){
							setTimeout(()=>{dispatch(loaderDoneJob())},500)
						}
						dispatch(answersLoadet())
						
					})
				}
			})
			.catch(err=>{console.log(err);})
	})
}


const loaderDoneJob = ()=>{
	return {
		type:Constances.DONEJOB,
	}
}
const stocksLoaded = ()=>{
	return {
		type:Constances.STOCKS_LOADET,
	}
}


const answersLoadet = ()=>{
	return {
		type:Constances.ANSWERS_LOADET,
	}
}

const answersProdLoadet = ()=>{
	return {
		type:Constances.ANSWERS_PROD_LOADET,
	}
}

const addTitleForStocks = ()=>{
	return {
		type:Constances.ADDSTOCKSTITLE,
	}
}

const addActinsTitle = ()=>{
	return {
		type:Constances.ADDACTIONSTITLE,
	}
}

const addProductsActionsTitle = ()=>{
	return {
		type:Constances.ADDPRODUCTSACTIONSTITLE,
	}
}

const minusImage = ()=>{
	return {
		type:Constances.MINUS_IMAGE,
	}
}


const imagesFound = rehidrate=>{
	return{
		type:Constances.IMAGE_SELECT,
		rehidrate,
	}
}

const start = ()=>{
	return {
		type:Constances.START_LOAD,
	}
}