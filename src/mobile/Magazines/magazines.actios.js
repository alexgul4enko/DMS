import Constances from './Constances';
import FullPromiseToSelectALL from '../localStore/FullPromiseToSelectALL';
import  rootConst from '../Constances';
import PutData from '../localStore/PutData';
import HttpPromice from '../HttpPromice';
import getTTAnswersByKeys from '../localStore/getTTAnswersByKeys';
import getStocksByID from '../localStore/getStocksByID';

const AmgazineActions = {

	checkStocks: RID =>{
		return (dispatch,getState)=>{
			getStocksByID(RID)
				.then(data=>{

					dispatch(setCheckSTOCKS(data ? {}: null));
				})
				.catch(err=>{
					console.log(err);
				})
		}
	},

	openDialog: function (act,reject){
		return {
			type: Constances.OPEN_TT_DIALOG,
			rehidrate: {act,reject},
		}
	},

	closeDialog:function(){
		return {
			type:Constances.CLOSE_TT_DIALOG,
		}
	},
	switchDialog:function(){
		return {
			type:Constances.SWITCH_TT_DIALOG,
		}
	},
	clearImagesList:function(){
		return {
			type:Constances.CLEAR_IMAGES_LIST,
		}
	},

	clearMagazinesList:function(id){
		return {
			type:Constances.CLEAR_MAGAZINES_LIST,
			id
		}
	},
	clearRoutesList:function(id){
		return {
			type:Constances.CLEAR_ROUTES_LIST,
			id
		}
	},

	saveAnswer(answer,retect,type,key){
		return (dispatch, state)=>{
			if(type == -12){
				const {ln,lg} = state().GPS;
				const updRoute = Object.assign({},key,{isVisit:1,reject:answer})
				const visitInfo = {
									id :key.id, 
									isReject : retect,
									reject : answer,
									date : new Date(),
									ln,
									lg,
								}

				PutData("Routes",updRoute)
							.then(()=>{
								dispatch(AmgazineActions.closeDialog());
								dispatch(UpdateRoute(updRoute));

								window.socket.emit("TT_VISIT",{id:updRoute.id
																,reject:updRoute.reject
																,ttid:updRoute.ttid
																,date:new Date()});
							})
							.catch(error=>{
								console.log(error);
							})

				HttpPromice('/api/VisitInfo','POST',visitInfo )
					.then(()=>{
						// console.log("succes");
					})
					.catch(err=>{
						PutData("VisitInfo",visitInfo)
							.then(()=>{
								// console.log("saved to localStore");
							})
							.catch(error=>{
								console.log(error);
							})
					})


			}
			else{
				const {ln,lg} = state().GPS;
				const answerTT = {
					id: key,
					reject:retect,
					ans:answer,
					data:new Date(),
					ln,
					lg,

				};
				PutData("TTanswers",answerTT)
					.then(()=>{
						dispatch(AmgazineActions.closeDialog());
						dispatch(UpdateTTAnswer(answerTT));
								
					})
					.catch(error=>{
						console.log(error);
					})

				
				// console.log("SAVETTAnswer");
				// console.log(answer+"   " + retect+"   " + type+"   " + key);
			}
		}
	},

	initData : function (actionsKeys){
		return (dispatch, state)=>{

			FullPromiseToSelectALL("Actions")
				.then(actions=>{
					dispatch(initActionsStore(actions));
					return getTTAnswersByKeys(actionsKeys);
				})	
				.then(TTanswers=>{
					dispatch(initTTAnswers(TTanswers));
					dispatch(initActionsDialog());
					dispatch(rehidrate_());
				})	
				.catch(err=>{
					console.log(err);
				})
		}
	}
}



const setCheckSTOCKS =  rehidrate =>{
	return{
		type:Constances.MAGAZINES_CHECK_STOCKS,
		rehidrate,
	}
}

function UpdateTTAnswer(rehidrate = {}){
	return {
		type:Constances.ANSWER_TT_QUESTION,
		rehidrate,
	}
}


function UpdateRoute (rehidrate = {}){
	return {
		type:Constances.UPDATE_ROUTE,
		rehidrate,
	}
}; 


function initActionsDialog(){
		return {
			type:Constances.INIT_ACTIONS_DIALOG,
		}
}



const rehidrate_ = function(){
		return {
			type:rootConst.REHIDRATE_STATE,
		}
	};





function initTTAnswers (rehidrate = {}){
	return {
		type:Constances.INIT_TT_ANSWERS,
		rehidrate,
	}
};





function initActionsStore (rehidrate = {}) {
	return {
		type:Constances.INIT_ACTIONS_STORE,
		rehidrate,
	}
};





export default AmgazineActions;