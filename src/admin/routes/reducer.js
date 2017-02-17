import Constances from './Constances';

export default function routes  (state=[],action){
	switch(action.type){
		case Constances.INIT_USER_ROUTES:
			return action.rehidrate;
		default:
			return state;
	}
};