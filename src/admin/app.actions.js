import Constances from './Constances';
import httpPromice from '../HttpPromice';
import { browserHistory } from 'react-router';

const appActions = {
	getUser : ()=>{
		return (dispatch,getState)=>{
			let UserData;
			httpPromice('/api/login','GET')
				.then(data=>{
					dispatch(setupUser(data))
				})
				.catch(err=>{
					console.log(err)
				})
		}
	},

	closeError: ()=>{
		return showError('');
	}
}

const showError = rehidrate =>({
	type:Constances.SHOW_ERROR,
	rehidrate,
});
const tongleLoading =()=>({
	type:Constances.TONGLE_LOADING,
});


const setupUser = rehidrate =>({
	type:Constances.SETUP_USER,
	rehidrate,
});

export default appActions;
export {showError,tongleLoading}