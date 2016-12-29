import React from 'react';
import UserItem from "./UserItem"


class UsersList extends React.Component {

	constructor(){
		super();
	}

	render(){
			return (
				<ul>
					{
						this.props.userlist.map((user_)=>{
							return user_.matchfilter ? <UserItem 
										key={user_.id} 
										user={user_}
										deleteUser={this.props.deleteUser}
										/> : ""
						})
					}
				</ul>	
				)
	}
}


export default UsersList;