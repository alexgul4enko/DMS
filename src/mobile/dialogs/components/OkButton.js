
import React ,{Component, PropTypes} from 'react';

export default function OkButton (props){
	return (
		<div 
			className = "dialog_bitton green material-icons"
			onClick = {props.handleClick}>
				{'check'}
		</div>
	)
}

OkButton.propTypes = {
	handleClick: PropTypes.func.isRequired,
}



