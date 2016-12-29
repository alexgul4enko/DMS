import React, { Component } from 'react'
import './OrderMenuItem.css'
export default function OrderMenuItem (props){
	return (
			<div className  = "menu_drawer_item"
					onClick = {props.handleClick}>
				<span className="material-icons">{props.img}</span> 
				{props.title}
			</div>
		)
}