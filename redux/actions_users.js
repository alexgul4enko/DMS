const constance = {
	ADD_USER : "ADD_USER",
	SELECT_USER : "SELECT_USER",
	CHECK_USER : "CHECK_USER"
};
let actions_users = {
	
	filtUser: function(value){
		
		return{
			type:constance.CHECK_USER,
			value:value
		}
	},

	selectUser:function(userId){
		return{
			type:constance.SELECT_USER,
			userId:userId
		}
	}
	
}

export default actions_users;