import React, { Component } from 'react'
import Main_menu from './Main_menu'
import NewOrderButton from './orders/NewOrderButton'

class Orders extends Component {
	constructor(){
		super();
		
	}

	render(){
		return ( 
			 <div className = "app">
			 	<Main_menu 
					goBack = {this.props.actions.goBack}
					fullScrean = {this.props.actions.fullScrean}
					prevStage = {this.props.flow.backStage}
					/>
				<div className="Content">
					<NewOrderButton
						addOrder = {this.props.actions.createNewOrder}
					/>
				</div>
			 </div>
		)
	}


}

export default Orders;