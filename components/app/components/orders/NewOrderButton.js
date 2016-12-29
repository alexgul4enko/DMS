import React, { Component } from 'react'
import './NewOrderButton.css'

export default function  NewOrderButton  (props) {
	return (
			<div 
				className = "newOrderbtn"
				onClick = {props.addOrder}
					
			>
				<span className="material-icons">add_circle_outline</span>
				new Order
			</div>
		)
}