import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input';


export default class Text extends Component{
	constructor(props){
		super(props);
		this.state = {
			value:props.answer || ""
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange (val){
		this.setState({value:val});
		this.props.setAnswer(val);
	}

	render(){
		return (
				<Input 
					type='text' 
					value={this.state.value} 
					onChange={this.handleChange}  />

			)
	}
}