import React , {Component, PropTypes} from 'react';
import Slider from 'react-toolbox/lib/slider';

export default class Range extends Component {
	constructor(props){
		super(props);
		
		const pass = props.alternatives.split('-');
		
		this.state = {
			from:parseInt(pass[0])||1,
			to:parseInt(pass[1])||10,
			value:parseInt(props.answer) || parseInt(pass[0])||1,
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
				<div className = "range aa">
					<h1>{this.props.question}</h1>
					 <Slider 
					 	min={this.state.from} 
					 	max={this.state.to}
					 	step={1}
					 	value={this.state.value} 
					 	onChange={this.handleChange} />
					<h2>{this.state.value}</h2>
				</div>
		)
	}
}

Range.propTypes = {
	question : PropTypes.string.isRequired,
	answer :PropTypes.any.isRequired,
	alternatives: PropTypes.string.isRequired,
}
