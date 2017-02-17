import Constances from './Constances';
import httpPromice from '../../HttpPromice';
import {showError,tongleLoading} from '../app.actions';
const actions = {
	initData : ()=>{
		return (dispatch,getState)=>{
			dispatch(tongleLoading());
			httpPromice(`/api/UserRoutes`,'GET')
				.then(data=>{
					dispatch(tongleLoading());
					dispatch(initRoutes(data));
					
				})
				.catch(err=>{
					console.error(err);
					dispatch(tongleLoading());
					dispatch(showError(err));
				})
		}
	}
}

const initRoutes = rehidrate =>({
	type:Constances.INIT_USER_ROUTES,
	rehidrate,
});


export default  actions;

