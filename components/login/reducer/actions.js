// import $ from 'jquery'
import httpGetAsync from '../../load'
const constance = {
	LOGIN : "LOGIN",
	CHANGEPASS : "CHANGEPASS",
	CHARGELOGIN : "CHARGELOGIN"
	
};

let actions = {

	login:function(data){
		return {
			type:constance.LOGIN,
			value:data
		}
	},
	asincLogin:function(){
		return (dispatch,getState) =>{
			const { login } = getState();
			const { pass } = getState();
			let userData = {login: login, pass:pass};


			httpGetAsync ("api/login", "POST", JSON.stringify(userData), 
				(data)=>{
					dispatch(actions.login(""));
				},
				(err)=>{
					if(err.status === 401){
	                    dispatch( actions.login("Ошибка авторизации"));
	                }
	                else{
	                    dispatch(actions.login("SERVER ERROR 401"));
	                }
				}
			)

			 // $.ajax({ type: "post",   
    //                     url: "api/login",
    //                     contentType: "application/json; charset=utf-8",
    //                     async: true,
    //                     data : JSON.stringify(userData),
    //                     success: function(data){
    //                       dispatch(actions.login(null));
    //                     },
    //                     error: (err)=>{
    //                       console.log(err);
    //                       if(err.status === 401){
    //                          dispatch( actions.login("Ошибка авторизации"));
                             
    //                       }
    //                       else{
    //                           dispatch(actions.login("SERVER ERROR 401"));
                              
    //                       }
                          
    //                     } 
    //             });  

			
			
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