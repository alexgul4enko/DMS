const constance = {
	LOGIN : "LOGIN",
	CHANGEPASS : "CHANGEPASS",
	CHARGELOGIN : "CHARGELOGIN"
	
};

export default function reducer(state, action){
	switch (action.type){
		
		case constance.LOGIN:
				
				if(!state.login){
					return Object.assign({},state,{error:"Введите логин"});
				}
				else if (!state.pass){
					return Object.assign({},state,{error:"Введите пароль"});
				}
				else{
					if(action.value){
						return Object.assign({},state,{error:action.value});
					}
					else{
						window.location = "/Preload";
						return Object.assign({},state,{error:""});
					}
				}

		
		case constance.CHANGEPASS:
			return Object.assign({},state,{pass:action.value, error:""});
				break;

		case constance.CHARGELOGIN:
			return Object.assign({},state,{login:action.value, error:""});
				break;

		
		default:
		return state;
	}
}