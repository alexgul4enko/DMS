
import constance from './Constances'

import galeryImageActions from './actions/GalleryImageActions'
import ordersActions from './actions/ordersActions'

let actions = {

	
	saveTTPhoto: function(data){
		return {
			type:constance.SAVE_TT_PHOTO,
			value:data,
		}
	},

	saveProductPhoto: function (data){
		return {
			type:constance.SAVE_PROD_PHOTO,
			value:data,
		}
	},


	savePhoto:function(to_insert, action, prevAnswer, tt){
		const DB_NAME = 'DMSMobile';
		const DB_VERSION = 1;
		return (dispatch,getState) =>{
			let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
			var req = indexedDB.open(DB_NAME, DB_VERSION);
			 req.onsuccess =  (evt) =>{
		                let db = evt.currentTarget.result;
		                let transaction_ = db.transaction(["Images"], "readwrite");
						let objectStore = transaction_.objectStore("Images");
						//there is no previous answer
						let table = action.type ==1 ? "TTAnswers" : "ProductAnswers"
						if (!prevAnswer){
								objectStore.add({imm:to_insert}).onsuccess = function(event){
			                		let rec_id = event.target.result;
			                		let new_ans = {
			                					id:action.key,
			                					ans: [rec_id],
			                					date: new Date(),
			                					rej:false,
			                					tt:tt
			                				};
			                		
			                		db.transaction(table, "readwrite")
			                			.objectStore(table)
			                			.add(new_ans)
			                		if(action.type ==1 ){
			                			dispatch(actions.saveTTPhoto(new_ans));
			                		}
			                		else{
			                			dispatch(actions.saveProductPhoto(new_ans));
			                		}
			                }
						}
						else {
							// there could be several answers
							if(action.mult == 1){
								objectStore.add({imm:to_insert}).onsuccess = function(event){
			                		let rec_id = event.target.result;
			                		let new_ans = Object.assign({},
						                						prevAnswer,
						                						{ans: [...prevAnswer.ans, rec_id], 
						                						 date: new Date()}
			                						);
			                	
			                		db.transaction(table, "readwrite")
			                			.objectStore(table)
			                			.put(new_ans)
			                		if(action.type ==1 ){
			                			dispatch(actions.saveTTPhoto(new_ans));
			                		}
			                		else{
			                			dispatch(actions.saveProductPhoto(new_ans));
			                		}
			                	}
							}
							//anly one photo could be for this actions
							//so we just need to update record
							else {
								let prev_img_id  = prevAnswer.ans[0];
								objectStore.put({imm:to_insert,id:prev_img_id});
							}
						}
		                

		            }
		}


		
	},



	goBack:function(){
		return {
			type:constance.GO_BACK
		}
	},

	setCameraByTT:function(action){
		return {
			type:constance.TT_CAMERA,
			value:action
		}
	},
	saveVisit:function(answer){
		return {
			type:constance.POST_VISIT,
			value:answer
		}
	},
	saveTTAnswer:function(answer){
		return {
			type:constance.POST_TT_Answer,
			value:answer
		}
	},
	backstage:function(url){
		return{
			type:constance.BACKSATGE,
			value:url
		}
	},


	selectTT:function(TT){
		return{
			type:constance.SELECT_TT,
			value:TT
		}
	},
	
	gps_ON:function(){
		// return{
		// 	type:constance.GPS_ON
		// } 
		return (dispatch,getState) =>{
			let watchID = navigator.geolocation.watchPosition (
					(data) =>{
						// console.log(data);
						dispatch(actions.gpsTracker({ln:data.coords.latitude, lg:data.coords.longitude}));
					},
					(err) =>{
						console.log(err);
					}
				)
			dispatch(actions.initGPS(watchID));
		}
	},

	stop_gpsTracker:function(){
		return{
			type:constance.STOP_GPR
		}
	},

	gpsTracker:function(data){
		return {
			type:constance.GPS_TRACKER,
			value:data
		}
	},

	initGPS: function (data){
		return {
			type:constance.INIT_GPS,
			value:data
		}
	},


	fullScrean:function(){
		return {
			type:constance.FULL_SCREAN
		}
	}
	
	
}



const f_actions = {...actions, ...galeryImageActions, ...ordersActions}

export default  f_actions;