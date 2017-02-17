import Constances from './Constances'
import httpGet from '../HttpPromice'
import InsertinitialStage from '../localStore/InsertinitialStage'
import groupData from './GropData';



const loadDataAction = {
	initSore:function(){
		return {
			type:Constances.INIT_STORE,
		}
	},

	reloadData:function(url){
		return {
			type:Constances.RELOAD_DATA,
			url
		}
	},

	dispatchLoadData:function(url){
		return (dispatch,getState)=>{
			httpGet(url,"GET", null)
			.then(data=>{
				return InsertinitialStage(url,groupData(url,data));
			})
			.then(final=>{
				dispatch(loadDataAction.setDataLoadet(url,null));
			})
			.catch(err=>{
				InsertinitialStage(url,[])
					.then(()=>{
						dispatch(loadDataAction.setDataLoadet(url,err));
					})
					.catch(()=>{
						dispatch(loadDataAction.setDataLoadet(url,err));
					});
				
			})
		}
	},


	setDataLoadet(url,err){
		return {
			type:Constances.LOAD_DATA_FINISHED,
			url,
			err
		}
	},
	clearStage:function(){
		return {
			type:Constances.CLEAR_STAGE
		}
	}

	
}


export default loadDataAction;