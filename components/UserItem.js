import React from 'react';



class UserItem extends React.Component {

	constructor(){
		super();
		this.handleDelete = this.handleDelete.bind(this);
	}
	handleDelete(){
		if(confirm("Dellete user " + this.props.user.text+"?"))
		this.props.deleteUser(this.props.user.id);
	}

	render(){
			return (
				
				
				<li>
					<span>{this.props.user.text}</span>
					<button onClick={this.handleDelete}> X </button>
				</li>	
				)
	}
}


export default UserItem;