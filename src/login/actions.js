import httpPromice from '../HttpPromice';
import constance  from './constances';

let actions = {
	login:function(data){
		return {
			type:constance.LOGIN,
			value:data
		}
	},
	asincLogin:function(){
		return (dispatch,getState) =>{
			const { login , pass} = getState();
			httpPromice("api/login", "POST", { login , pass})
				.then(data=>{
					dispatch(actions.login(""));
				})
				.catch(err=>{
					dispatch(actions.login(err));
				})
		}
	},
	changepass:function(pass){
		return{
			type:constance.CHANGEPASS,
			value:pass
		}
	},
	changelogin:function(login){
		return{
			type:constance.CHARGELOGIN,
			value:login
		}
	}
	
}

export default actions;

