


const constance = {
	FULL_SCREAN : "FULL_SCREAN",
	PRELOAD : "PRELOAD",
	LOG_OUT:"LOG_OUT",
	DO_NOT_SYNC : "DO_NOT_SYNC",
	HEADERS : "HEADERS",
	WEBDB : "WEBDB"

};

let actions = {

	fullScrean:function(){
		return {
			type:constance.FULL_SCREAN
		}
	},
	logout:function(){
		return{
			type:constance.LOG_OUT
		}
	},
	donotSync:function(){
		return{
			type:constance.DO_NOT_SYNC
		}
	},
	adddata(data){
		return{
			type:constance.PRELOAD,
			value:data
		}
	},
	addHeaders(data){
		return{
			type:constance.HEADERS,
			value:data
		}
	},
	rundata(data){
		return{
			type:constance.WEBDB
		}
	},
	saveData (){
		return (dispatch,getState) =>{
			const { data } = getState();
				
				dispatch(actions.addHeaders("Обработка данных"));
				dispatch(actions.rundata(data));

		}
	},
	prepareData(data_){
		return (dispatch,getState) =>{
			const { data } = getState();

			if(data.length ==9){

					 dispatch(actions.adddata(data_));
					 dispatch(actions.addHeaders("Загрузка данных с сервера окончена"));
					 dispatch(actions.saveData());
			}
			else{
				dispatch(actions.adddata(data_));
			}
			
		}
	},

	synchronize:function(){
	
		return (dispatch) =>{
			document.getElementById("loaders").classList.add('load');
			setTimeout(function (){
				 dispatch(actions.addHeaders("Загрузка данных с сервера"));
			}, 1);
			let loader = require('./DataLoader')(dispatch,actions);
			loader();

		}
	}
	
}




export default actions;