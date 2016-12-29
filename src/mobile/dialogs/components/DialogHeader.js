import React, {Component, PropTypes} from 'react';

export default function DialogHeader (props){

	const class_ = props.reject ? "DialogHeader red" : "DialogHeader green" ;
	return (
		
		<div className = {class_}></div>
	)
}
DialogHeader.propTypes = {
	reject : PropTypes.bool,
}
