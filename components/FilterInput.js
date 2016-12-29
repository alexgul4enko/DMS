import React from 'react';



class Filterinput extends React.Component {

	constructor(){
		super();
		this.filterUsers = this.filterUsers.bind(this);
		this.state={
			filterval:""
		}
	}
	filterUsers(e){
		let val = e.target.value;
		
		this.setState({
			filterval : val
		})
		this.props.filtUser(val);
	}

	render(){
			return (
				<input className="filter"
					type="search" 
					placeholder="find:" 
					value={this.state.filterval}
					onChange={this.filterUsers}/>	
				)
	}
}


export default Filterinput;