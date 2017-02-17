import Constances from './Constances';

export default function myUsers  (state=[],action){
	switch(action.type){
		case Constances.INIT_MYUSERS_LIST:
			return action.rehidrate;
		default:
			return state;
	}
};