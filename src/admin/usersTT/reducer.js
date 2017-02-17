import Constances from './Constances';

export default function TTusers  (state=[],action){
	switch(action.type){
		case Constances.INIT_TT_USERS:
			return action.rehidrate;
		default:
			return state;
	}
};