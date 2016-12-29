import React, {Component, PropTypes} from 'react'


export default class RejectQuestion extends Component{
	constructor(props){
		super(props);
		this.state = {
			value: props.answer ? props.answer : "",
		}
		this.handleChange = this.handleChange.bind(this);
		this.getData = this.getData.bind(this);
	}



	handleChange(e){
		this.setState({value : e.target.value});
	}

	getData(){
		return this.state.value;
	}

	render(){
		return (
			<div>
				<h1>Введите причину отказа либо свой вариант</h1>
				<input 
						className = "rejectInput"
						type = "text" 
						value = {this.state.value} 
						onChange = {this.handleChange}/>
			</div>
		)
	}
		
}


RejectQuestion.propTypes = {
	answer :PropTypes.string,
}