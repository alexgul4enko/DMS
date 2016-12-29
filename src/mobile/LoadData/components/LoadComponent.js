import React, {Component,PropTypes} from 'react';
import Loader from './Loader'


export default class LoadComponent extends Component {
	constructor(props){
		super(props);
		this.showError = this.showError.bind(this);

	}
	render(){
		return (
			<div className = "LoadComponent" 
				onClick = {this.props.err ? this.showError: ()=>{}}>
				{this.props.isloadet ? 
						this.props.err ? 
							<span className="ll error">X</span>:
							<span className="ll">&#10003;</span>:
						<Loader/>
				}
				<span className = "name">{this.props.name}</span>
			</div>
		)
	}

	showError(){
		this.props.showError(this.props.err,this.props.url);
	}


	componentWillMount() {
		this.props.onMount(this.props.url);
	}
}

LoadComponent.propTypes = {
	isloadet: PropTypes.bool.isRequired,
	err:  PropTypes.any.isRequired,
	url: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	showError: PropTypes.func.isRequired
}






