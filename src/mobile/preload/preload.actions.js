import constances from './constances'
import checkIsData from '../localStore/CheckLocalData'
const preloadActions =  {
	initStore:()=>{
		return (dispatch,getState)=>{
			checkIsData().
				then(db =>{
					dispatch(preloadActions.unlockNext(true))
				})
				.catch(error=>{
					dispatch(preloadActions.unlockNext(false))
				})
		}
	},

	unlockNext:function(payload){
		return {
			type:constances.UNLOCKAPP,
			payload,
		}
	},
	goToApp:function(){
		return {
			type:constances.GO_TO_APP,
		}
	},
	SyncData:function(){
		return {
			type:constances.START_SYNC_DATA,
		}
	}



}

export default preloadActions;