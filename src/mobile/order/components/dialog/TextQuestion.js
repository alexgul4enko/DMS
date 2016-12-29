import React , {Component, PropTypes} from 'react';
import ReactStars from 'react-stars'

export default class TextQuestion extends Component {
	constructor(props){
		super(props);
		this.state = {
			value:props.answer||'',
		}
		this.handleChange = this.handleChange.bind(this);
	}


	getData(){
		return this.state.value;
	}



	handleChange(e){
		this.setState({value:e.target.value});
	}

	render(){
		return(
			<input 
				className = "rejectInput"
				type="text" 
				value={this.state.value} 
				onChange= {this.handleChange}
			/>
		)
	}
}

TextQuestion.propTypes = {
	answer :PropTypes.string.isRequired,
}
