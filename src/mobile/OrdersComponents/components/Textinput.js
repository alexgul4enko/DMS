
import React , {Component,PropTypes} from 'react';

export default class Textinput extends Component{
	constructor (props){
		super(props);

		this.state = {
			value : props.text,
		}

		this.getData = this.getData.bind(this);
		this.handleChange  = this.handleChange.bind(this);
	} 

	render (){
		return (
			<input 
				className = "Comment"
				type = "text" 
				value = {this.state.value}
				onChange ={this.handleChange}/>
		)
	}


	handleChange (e){
		this.setState({value :e.target.value,});
	}



	getData (){
		return this.state.value;
	}
}


Textinput.propsTypes = {
	text : PropTypes.string,
}