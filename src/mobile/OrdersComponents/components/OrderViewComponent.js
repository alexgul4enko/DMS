import React , {Component,PropTypes} from 'react';
import {deloveryForms} from '../../../../properties';
import './orderView.css';
import Dialog from 'react-toolbox/lib/dialog';
import RadioButtons from './RadioButtons';
import {  Snackbar } from 'react-toolbox';
import Textinput from './Textinput';
import { browserHistory } from 'react-router';

export default class OrderViewComponent extends Component{
	constructor (props){
		super(props);
		this.state = {
			dialog_active:false,
			dialog_type : null,
			snack_active : false,
			snack_text: "",
		}
		this.closeDialog = this.closeDialog.bind(this);
		this.getDialogContext = this.getDialogContext.bind(this);
		this.changeOrderStatus = this.changeOrderStatus.bind(this);
		this.deleteOrder = this.deleteOrder.bind(this);
		this.changeOrderComment = this.changeOrderComment.bind(this);
		this.goToOrder = this.goToOrder.bind(this);
		this.handleSnackbarClick = this.handleSnackbarClick.bind(this);
	}

	closeDialog() {
		this.setState({dialog_active:false,dialog_type : null,});
	}

	handleSnackbarClick(){
		this.setState({snack_active:false,snack_text:"",});
	}

	showDialog(dialog_type){
		this.setState({dialog_active:true,dialog_type,});
	}

	deleteOrder (){
		if(this.props.status == 2){
			this.setState({snack_active:true, snack_text:"Заказ отправлен("});
		}
		else{
			this.props.deleteOrder(this.props.id);
		}

		
	}

	changeOrderStatus(){
		const newStatus =  this.refs.status.getData();
		if((!this.props.qty ||this.props.qty==0 ) && newStatus == "Отправить"){
			this.setState({snack_active:true, snack_text:"Заказ пустой"});
		}
		else if(newStatus == "В работе"  && this.props.status >1){

			this.closeDialog();
			this.setState({snack_active:true, snack_text:"Запрос отправлен"});
			this.props.getOrderBack(this.props.id, this.props.order.RID);
		}
		else {

			const statusID = newStatus =="В работе" ? 1 :2;
			this.closeDialog();
			this.props.changeStatus(this.props.id, statusID,this.props.order );
			
		}
		

	}

	changeOrderComment (){
		const comment =  this.refs.comment.getData();
		this.closeDialog();
		this.props.changeComment(this.props.id,comment,this.props.order );
	}


	goToOrder(){
		this.props.initOrder(this.props.order)
		browserHistory.push({
								pathname: '/Order',
								state: this.props.id
							});
		// console.log(`go to order with ID: ${this.props.id}`);
	}
	

	getDialogContext(){
		switch (this.state.dialog_type){
			case 1:
				return this.props.status==1? 
						( <div>
							<h1>Удалить заказ?</h1>
							<div className = "buttons">
								<div 
									className = "dialog_bitton red material-icons"
									onClick = {this.closeDialog}>
										{'cancel'}
								</div>
								<div 
									className = "dialog_bitton green material-icons"
									onClick = {this.deleteOrder}>
										{'check'}
								</div>
								
							</div>
						</div>) : <h1>Нельзя удалять отправленный заказ</h1>
			case 2:
				return ( <div>
							<h1>Статус заказа</h1>
							<RadioButtons 
								ref = {"status"}
								alternatives = {["В работе","Отправить"]}
								answer = {getStatusName(this.props.status)}
							/>
							<div className = "buttons">
								<div 
									className = "dialog_bitton red material-icons"
									onClick = {this.closeDialog}>
										{'cancel'}
								</div>
								<div 
									className = "dialog_bitton green material-icons"
									onClick = {this.changeOrderStatus}>
										{'check'}
								</div>
								
							</div>
						</div>);
			case 3:
				return this.props.status==1? 
						( <div>
							<h1>Коментарий к заказу</h1>
							<Textinput ref= "comment" text = {this.props.comment || ""}/>
							<div className = "buttons">
								<div 
									className = "dialog_bitton red material-icons"
									onClick = {this.closeDialog}>
										{'cancel'}
								</div>
								<div 
									className = "dialog_bitton green material-icons"
									onClick = {this.changeOrderComment}>
										{'check'}
								</div>
								
							</div>
						</div>):
						( <div>
							<h1>Коментарий к заказу</h1>
							<h1>{this.props.comment || "-"}</h1>
						</div>)

			default :
				return '';
		}
	}




	render(){
		return (
			<div className = "OrderView">
				<div className = "mainInfo">
					<div className = "magazine" onClick = {this.goToOrder}>{this.props.name}</div>
					<div className = "order" onClick = {this.goToOrder}> 
						<div className = "numbers" >
							<span>{`$`}</span>
							<span>{this.props.sum.toFixed(2)}</span>
						</div>
						<div className = "numbers">
							<span>{`%`}</span>
							<span>{this.props.sum_d.toFixed(2)}</span>
						</div>
						<div className = "numbers">
							<span>{`К-во`}</span>
							<span>{this.props.qty}</span>
						</div>
					</div>
					<div className = "footer">
						<div 
							className="material-icons delete"
							onClick = {this.showDialog.bind(this,1)}
							>delete_forever
						</div>
						<div className = "date">{prettyDate(this.props.date)}</div>
					</div>
				</div>
				<div className = "slider">
					<div 
						className = "status"
						onClick={this.showDialog.bind(this,2)}
						>{getStatusName(this.props.status)}
					</div>
					<div className = "payform">{this.props.payForm}</div>
					<div className = "delivery">{getDelivery(this.props.delivery)}</div>
					<div 
						className = "comment material-icons" 
						onClick={this.showDialog.bind(this,3)}
					>comment
					</div>
				</div>

					


				<Dialog
					className = "PreOrderDialog"
					active={this.state.dialog_active || false}
					onEscKeyDown={this.closeDialog}
					onOverlayClick={this.closeDialog}
					title=''
					>
						{this.getDialogContext()}
				</Dialog>
				<Snackbar
						className = "ERROR_DIALOG"
						action='Dismiss'
						active={this.state.snack_active}
						label={this.state.snack_text}
						timeout={2000}
						onClick={this.handleSnackbarClick}
						onTimeout={this.handleSnackbarClick}
						type='accept'
					/>
				
			</div>
		)
	}
} 

OrderViewComponent.propTypes = {
	name:PropTypes.string.isRequired,
	comment:PropTypes.string.isRequired,
	id:PropTypes.string.isRequired,
	payForm:PropTypes.string.isRequired,
	status:PropTypes.number.isRequired,
	delivery:PropTypes.number.isRequired,
	prod:PropTypes.object,
	sum:PropTypes.number.isRequired,
	sum_d:PropTypes.number.isRequired,
	qty:PropTypes.number.isRequired,
	date:PropTypes.any.isRequired,
	order:PropTypes.object.isRequired,
}

OrderViewComponent.defaultProps = {
	sum:0,
	sum_d:0,
	qty:0,
};


const getDelivery = id=>{
	return deloveryForms[id] || deloveryForms[0];
}


const getStatusName = id=>{
	switch(id){
		case 1:
			return "В работе";
		case 2:
			return "Отправить";
		case 3:
			return "Отправлен";
		default:
			return "В работе";
	}
}


const prettyDate = date=>{
	if(!date) return "";
	return `${date.getYear()+1900}-${date.getMonth()<10?
			"0" +date.getMonth():date.getMonth()}-${date.getDate()<10?"0" +date.getDate():date.getDate()}`
}

