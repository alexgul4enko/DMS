import Constances from './Constances';


export function clearImagesReducer (state = [], action){
	switch(action.type){
		case Constances.CLEAR_IMAGES_LIST :
			return [];
		default:
			return state;
	}
}

export function CheckStocksReducer (state = {}, action){
	switch(action.type){
		case Constances.MAGAZINES_CHECK_STOCKS :
			return action.rehidrate;
		default:
			return state;
	}
}

export function clearMagazinesReducer (state = {}, action){
	switch(action.type){
		case Constances.CLEAR_MAGAZINES_LIST :
			const {[action.id]: router} = state;
			return {[router.id] :router};
		default:
			return state;
	}
}

export function updateRouteVisit (state = {}, action){
	switch(action.type){
		case Constances.UPDATE_ROUTE :
			return Object.assign({},state,
					{[action.rehidrate.id]:action.rehidrate}
				);
		case Constances.CLEAR_ROUTES_LIST :
			const {[action.id]: router} = state;
			return {[router.id] :router};
		default:
			return state;
	}
}



export function TTActionsDialogReducer (state = {}, action){
	switch(action.type){
		case Constances.INIT_ACTIONS_DIALOG :
			return {active: false, rejected:false, action:null };
		case Constances.CLOSE_TT_DIALOG :
			return {active: false, rejected:false, action:null };
		case Constances.OPEN_TT_DIALOG:
			const {key,ans,quest,reject,act :type,answer} = action.rehidrate.act;

			return {answer,key,ans,quest,reject,type,active: true ,rejected : reject};
		case Constances.SWITCH_TT_DIALOG:
			return Object.assign({}, state, {rejected:!state.rejected} )
		default:
			return state;
	}
}



export function  TTAnswersReducer  (state= {}, action){
	switch(action.type){
		case Constances.INIT_TT_ANSWERS:
			return action.rehidrate;
		case Constances.ANSWER_TT_QUESTION:
			return Object.assign({},state,
					{[action.rehidrate.id]:action.rehidrate}
				);
		default:
			return state;
	}
};






export function  UserActionsReducer  (state= {}, action ){
	switch(action.type){
		case Constances.INIT_ACTIONS_STORE:
			return action.rehidrate;
		default:
			return state;
	}
};





