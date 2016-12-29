import React, {Component,PropTypes} from 'react'

export default class  SnackBar extends Component{
	render(){

		const snack = this.props.active ? 
							<div className = "SnackBar">
								{this.props.children}
							</div> : null;	
		return snack;
	}
}


SnackBar.propsTypes = {
	active:PropTypes.bool.isRequired,
	children:PropTypes.element,
}