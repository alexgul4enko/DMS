import React from 'react';



class NewUserInput extends React.Component {

	constructor(){
		super();
		this.state = {
			inputText: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);


	}

	handleSubmit(e){

		e.preventDefault();
		if(!this.state.inputText){
			alert("Enter userName");
			return;
		}
		this.props.addUser(this.state.inputText);
		this.setState({
			inputText : ""
		})

	}


	handleChange(e){
		this.setState({
			inputText : e.target.value
		})
	}


	render(){
			return (
				<div className = "add">
					<input 
						type="text"
						placeholder="Type in username:"
						value={this.state.inputText}
						onChange={this.handleChange}
					/>
					<button 
						onClick={this.handleSubmit}>
						Add</button>
					
				</div>	
				)
	}
}


export default NewUserInput;