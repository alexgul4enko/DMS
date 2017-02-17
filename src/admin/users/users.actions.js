import Constances from './Constances';
import httpPromice from '../../HttpPromice';
import {showError,tongleLoading} from '../app.actions';
const actions = {
	initUsers : ()=>{
		return (dispatch,getState)=>{
			dispatch(tongleLoading());
			httpPromice(`/api/MyUsers`,'GET')
				.then(data=>{
					dispatch(tongleLoading());
					dispatch(initUser(data));
					
				})
				.catch(err=>{
					console.error(err);
					dispatch(tongleLoading());
					dispatch(showError(err));
				})
		}
	}
}

const initUser = rehidrate =>({
	type:Constances.INIT_MYUSERS_LIST,
	rehidrate,
});


export default  actions;

