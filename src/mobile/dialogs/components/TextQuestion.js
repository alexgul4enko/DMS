import React , {Component, PropTypes} from 'react';
import ReactStars from 'react-stars'

export default class TextQuestion extends Component {
	constructor(props){
		super(props);
		this.state = {
			value:props.answer,
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
				<div className = "stars aa">
					<h1>{this.props.question}</h1>
					<input 
						className = "rejectInput"
						type="text" 
						value={this.state.value} 
						onChange= {this.handleChange}
					/>
				</div>
		)
	}
}

TextQuestion.propTypes = {
	question : PropTypes.string.isRequired,
	answer :PropTypes.string.isRequired,
}
