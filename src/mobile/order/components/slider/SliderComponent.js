import React , {Component, PropTypes } from 'react';




export default class SliderComponent extends Component{
	render(){
		return (
			<div 
				className = {`SliderComponent ${this.props.status == 1 ? "" : "grey"}`}
				onClick = {this.props.clickHandler}>
				{this.props.title}
			</div>
		)
	}
};


SliderComponent.propTypes = {
	title : PropTypes.string.isRequired,
	clickHandler : PropTypes.func.isRequired,
	status :PropTypes.number.isRequired,

};