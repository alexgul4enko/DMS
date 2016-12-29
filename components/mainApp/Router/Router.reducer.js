export default (state = {}, action) => {
	  switch (action.type){
			case "test":
				console.log("hey from router reducer");
				console.log(state)
				return state;
			default:
				return state;

	  }
	  	
    
      
}