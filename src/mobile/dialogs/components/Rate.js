import React , {Component, PropTypes} from 'react';
import ReactStars from 'react-stars'

export default class Rate extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			co:parseInt(props.alternatives)||5,
			value:parseInt(props.answer) ||1,
		}

		this.handleChange = this.handleChange.bind(this);

	}


	getData(){
		return this.state.value;
	}



	handleChange(value){
		this.setState({value,});
	}

	render(){
		return(
				<div className = "stars aa">
					<h1>{this.props.question}</h1>
					<ReactStars
						  count={this.state.co}
						  onChange={this.handleChange}
						  size={"50"}
						  value = {this.state.value}
						  half={true}
						  color1={"#292f32"}
					  	  color2={'#009688'}
					/>
				</div>
		)
	}
}

Rate.propTypes = {
	question : PropTypes.string.isRequired,
	answer :PropTypes.any.isRequired,
	alternatives: PropTypes.string.isRequired,
}
