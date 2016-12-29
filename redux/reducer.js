const constance = {
	ADD_USER : "ADD_USER",
	SELECT_USER : "SELECT_USER",
	CHECK_USER : "CHECK_USER"
};
function getId (state){
	return state.userlist.reduce((maxId,user) => {
		return Math.max(user.id,maxId);
	}, -1)+1
}

export default function reducer(state, action){
	switch (action.type){
		
		case constance.CHECK_USER:
			if(!action.value){
				return Object.assign({},state,{
				usersList: state.usersList.map((user)=>{
								return Object.assign({}, user,{
									matchfilter:true
								})
				})
			
			});
			}
			return Object.assign({},state,{
				usersList:state.usersList.map((user)=>{

					return Object.assign({},user,
						{matchfilter: action.value?
									user.name.toUpperCase().indexOf(action.value.toUpperCase())>=0
								:true}) 
						
						

				})
			});

		case constance.SELECT_USER:
			return Object.assign({},state,{
				usersList: state.usersList.map((user)=>{
								return Object.assign({}, user,{
									matchfilter:false
								})
				})
				,
				SelectedUserId:action.userId
			})

		
		default:
		return state;
	}
}