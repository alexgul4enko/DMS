import  React , {Component, PropTypes} from 'react';

export default function Filter (props){
	return (
		<div className = "filters">
			<input type = "text"  
				onChange = {props.handleTextFilter}
				placeholder = "filter" 
				className = "OrdersFilter"
				value = {props.search}
			/>

			<span 
				className = "material-icons"
				onClick = {props.handleCheckFilter}
			>
				{props.checked ? 'check_box' : 'check_box_outline_blank'}
			</span>
		</div>
	)
} 


Filter.propTypes = {
	handleTextFilter : PropTypes.func.isRequired,
	search : PropTypes.string.isRequired,
	handleCheckFilter: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
}