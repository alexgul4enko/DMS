import React, { Component } from 'react'
import './OrdersMenu.css'

export default function OrdersMenu (props){
	return (
			 <div id = "order_menu">
			 	<i className="material-icons go_back"
			 		onClick = {props.showmenu}>menu</i>
			 	<div className = "fs">
			 		<img src="./files/sync-symbol.svg" className= "sync"
			 			onClick = {props.sync}
			 			/>
			 		<img src="./files/full-screen.svg"
			 			 onClick = {props.fullScrean}/>
			 	</div>
			 </div>
		)	
}