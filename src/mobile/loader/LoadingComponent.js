import React, {Component,PropTypes} from 'react';
import LANIM from './LANIM'


export default class LoadingComponent extends Component {

	render(){
		return (
			<div className = "LoadComponent" >
				{this.props.isloadet ? 
						<span className="ll">&#10003;</span>:
						<LANIM/>
				}
				<span className = "name">{this.props.title}</span>
			</div>
		)
	}

	
}

LoadingComponent.propTypes = {
	isloadet: PropTypes.bool.isRequired,
	title:  PropTypes.any.isRequired,
	
}










