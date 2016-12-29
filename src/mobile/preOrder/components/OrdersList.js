import React , {Component,PropTypes} from 'react';

export default function OrdersList (props){
	return (
		<div className = "OrdersRouteList"> {props.children}</div>
	)
}

OrdersList.propTypes = {
	children : PropTypes.node,
}
