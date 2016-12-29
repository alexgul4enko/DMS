import React from 'react';



class Users extends React.Component {

	constructor(){
		super();
		
		this.state = {
				filterVal : "",
			};
		this.filter = this.filter.bind(this);
		this.selectUser = this.selectUser.bind(this);

		


		

	};


	filter(e){
		let val = e.target.value;
		this.setState({
			filterVal : val
		});
		this.props.filter(val);



	}

	selectUser(e){

		this.props.selectUser(e.target.getAttribute("data-key"));
	}



	render(){

		console.log(this.props.selectedid);
		
		return(
			<div className = "userFilter">
				<input type="search" placeholder = "Пользователь" value = {this.state.filterVal}
						onChange= {this.filter}/>
				<div className = "filtered">
					{
						this.props.userlist.map((user_,id)=>{
							return user_.matchfilter ? 
							<span 
										data-key = {id}
										onClick = {this.selectUser}
										key={user_.id} > 
										{user_.name}</span>
										
								
										: ""
						})
					}
				</div>
			</div>
		)
	};





}


export default Users;