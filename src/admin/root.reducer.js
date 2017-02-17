import {combineReducers}  from 'redux';
import { routerReducer } from 'react-router-redux';
import joinReducers from './joinReducers';
import Constances from './Constances';
import myUsers from './users/users.reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  loading,
  myUsers,
});



function loading  (state={loading:false, err:''},action){
	switch(action.type){
		case Constances.TONGLE_LOADING:
			return {...state,loading:!state.loading};
		case Constances.SHOW_ERROR:
			return {loading:false, err:action.rehidrate };
		default:
			return state;
	}
};

function user (state={},action ){
	switch(action.type){
		case Constances.SETUP_USER:
			return action.rehidrate;
		default: 
			return state;
	}
};



export default rootReducer;