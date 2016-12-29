

import React ,{Component, PropTypes} from 'react';

export default function RejectButton (props){
	return (
		<div 
			className = "dialog_bitton red material-icons"
			onClick = {props.handleClick}>
				{'cancel'}
		</div>
	)
}

RejectButton.propTypes = {
	handleClick: PropTypes.func.isRequired,
}







