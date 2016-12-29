import React , {Component, PropTypes} from 'react';
import Switch from 'react-toolbox/lib/switch';

export default class YesNo extends Component {
	constructor(props){
		super(props);
		const active = props.answer? true :false;
		
		this.state = {
			active
		}

		this.handleChange = this.handleChange.bind(this);

	}


	getData(){
		return this.state.active ? 1 : 0;
	}



	handleChange(){
		this.setState({active:!this.state.active});
	}

	render(){
		return(
				<div className = "switch aa">
					<h1>{this.props.question}</h1>
					 <Switch
						checked={this.state.active}
						label=""
						onChange={this.handleChange}
					/>
				</div>
		)
	}
}

YesNo.propTypes = {
	question : PropTypes.string.isRequired,
	answer :PropTypes.any.isRequired,
}
