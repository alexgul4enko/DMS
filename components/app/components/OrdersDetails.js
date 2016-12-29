import React, { Component } from 'react'
import Drawer from 'react-toolbox/lib/drawer'
import OrdersMenu from './orders/OrdersMenu'
import './orders/OrderDetails.css'
import OrderMenuItem from './orders/OrderMenuItem'
import Dialog from 'react-toolbox/lib/dialog';


class OrdersDetails extends Component {
	constructor(props){
		super(props);
		this.showdialog = this.showdialog.bind(this);
		
	}


	showdialog(type){
		return ()=>{
			this.props.actions.showOrderMenuDialog(type);
		}
	}



	render(){
		return ( 
			 <div className = "app">
			 	<OrdersMenu
			 		fullScrean = {this.props.actions.fullScrean}
			 		sync = {this.props.actions.syncFromOrders}
			 		showmenu = {this.props.actions.tongleDrowerMenu}
			 	/>

			 	 <Drawer active={this.props.orderStore.showDrawer} 
			 	 			onOverlayClick={this.props.actions.tongleDrowerMenu}>
			 	 			<OrderMenuItem 	
			 	 					dialogType = {1}
			 	 					img = {'directions_car'}
			 	 					title={'Способ доставки'}
			 	 					handleClick = {this.showdialog(1)}
			 	 					/>
			 	 			<OrderMenuItem 
			 	 					dialogType = {2}
			 	 					img = {'payment'}
			 	 					title={'Форма оплаты'}
			 	 					handleClick = {this.showdialog(2)}
			 	 					/>
			 	 			<OrderMenuItem 
			 	 					dialogType = {3}
			 	 					img = {'comment'}
			 	 					title={'Коментарий'}
			 	 					handleClick = {this.showdialog(3)}
			 	 					/>
			 	 			<OrderMenuItem 
			 	 					dialogType = {4}
			 	 					img = {'loyalty'}
			 	 					title={'Скидка'}
			 	 					handleClick = {this.showdialog(4)}
			 	 					/>
			 	 			<OrderMenuItem 
			 	 					dialogType = {5}
			 	 					img = {'shop_two'}
			 	 					title={'Статус заказа'}
			 	 					handleClick = {this.showdialog(5)}
			 	 					/>
			 	 			<OrderMenuItem 
			 	 					dialogType = {6}
			 	 					img = {'shopping_cart'}
			 	 					title={'Сохранить заказ'}
			 	 					handleClick = {this.showdialog(6)}
			 	 					/>
			 	 			<OrderMenuItem 
			 	 					dialogType = {7}
			 	 					img = {'exit_to_app'}
			 	 					title={'Выйти без сохранения'}
			 	 					handleClick = {this.showdialog(7)}
			 	 					/>
		        </Drawer>


		        <Dialog
		          active={this.props.orderStore.showDialog}
		          onEscKeyDown={this.props.actions.closeOrderDialog}
		          onOverlayClick={this.props.actions.closeOrderDialog}
		        >
		          <p>{`This shoud be dialog #${this.props.orderStore.dialogType}`}</p>
		        </Dialog>


			 </div>
		)
	}


}

export default OrdersDetails;