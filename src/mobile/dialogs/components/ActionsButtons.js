import React ,{Component, PropTypes} from 'react';
import BackButton from './BackButton';
import OkButton from './OkButton';
import RejectButton from './RejectButton'

export default function ActionsButtons (props){
	const red_button = props.reject ? <BackButton handleClick = {props.switchDialog}/> :
										<RejectButton handleClick = {props.switchDialog}/>;
	return (
		<div className = "dialog_actions">
			{red_button}
			<OkButton handleClick = {props.saveAnswer} />
			
		</div>
			
	)
}

ActionsButtons.propTypes = {
	switchDialog: PropTypes.func.isRequired,
	saveAnswer:PropTypes.func.isRequired,
	reject:PropTypes.bool,
}

