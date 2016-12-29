import React ,{Component, PropTypes} from 'react';

export default function BackButton (props){
	return (
		<div 
			className = "dialog_bitton red material-icons"
			onClick = {props.handleClick}>
				{'chevron_left'}
		</div>
	)
}

BackButton.propTypes = {
	handleClick: PropTypes.func.isRequired,
}



