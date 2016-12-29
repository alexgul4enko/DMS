import React , {Component,PropTypes} from 'react'; 
import Menu from './menu/Menu';
import Slider from './slider/Slider';
import ProdContainer from './ProdContainer';
import Dialog from 'react-toolbox/lib/dialog';
import {  Snackbar } from 'react-toolbox';
import OrdersDialog from  './dialog/OrdersDialog';
import {deloveryForms} from '../../../../properties';
import { browserHistory } from 'react-router';



export default class OrdersComponent extends Component {

	constructor(props){
		super(props);
		this.state = {
			showMenu:false,
			active: false,
			dialogType: null,
			errror:false,
			error_title:'',
		}
		this.tongleMenu = this.tongleMenu.bind(this);
		this.showPayFormsDialog = this.showPayFormsDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.getDialogAlternatives = this.getDialogAlternatives.bind(this);
		this.getDialogAnswer  = this.getDialogAnswer.bind(this);
		this.changePayForm = this.changePayForm.bind(this);
		this.getDialogOkLoastener = this.getDialogOkLoastener.bind(this);
		this.showDiscountDialog = this.showDiscountDialog.bind(this);
		this.changeDiscount = this.changeDiscount.bind(this);
		this.showOrderCommentDialog = this.showOrderCommentDialog.bind(this);
		this.changeOrderComment = this.changeOrderComment.bind(this);
		this.showDeliveryDialog = this.showDeliveryDialog.bind(this);
		this.changeDelivery = this.changeDelivery.bind(this);
		this.showErrorSnack = this.showErrorSnack.bind(this);
		this.handleSnackbarClick = this.handleSnackbarClick.bind(this);
	}


	OutOrder(){
		browserHistory.goBack();
	}

	showErrorSnack(error_title){
		this.setState({errror:true,error_title});
	}
	handleSnackbarClick(){
		this.setState({errror:false,error_title:''});
	}

	tongleMenu(){
		this.setState({showMenu:!this.state.showMenu});
	}

	changeDelivery (del){
		if(del || del ==0){
			this.props.changeDeliveryType(del);
		}
		this.closeDialog();
	} 
	showDeliveryDialog(){
		if(this.props.order.status == 1){
			this.setState({active:true,dialogType:4 });
		}
		else{
			this.showErrorSnack('Заказ отправлен');
		}
		
	}
	changeOrderComment(commet){
		this.props.changeComment(commet)
		this.closeDialog();
	}

	showOrderCommentDialog(){
		if(this.props.order.status == 1){
			this.setState({active:true,dialogType:3 });
		}
		else{
			this.showErrorSnack('Заказ отправлен');
		}
	}


	showPayFormsDialog(){
		if(this.props.order.status == 1){
			this.setState({active:true,dialogType:1 });
		}
		else{
			this.showErrorSnack('Заказ отправлен');
		}
	}

	showDiscountDialog(){
		if(this.props.order.status == 1){
			this.setState({active:true,dialogType:2 });
		}
		else{
			this.showErrorSnack('Заказ отправлен');
		}
	}
	changeDiscount(disc){
		if(disc){
			const d = parseInt(disc);
			this.props.changeDiscount(d);
		}
		this.closeDialog();
	}

	closeDialog(){
		this.setState({active:false,dialogType:null });
	}

	changePayForm(pf){
		this.props.changePayForm(parseInt(pf));
		this.closeDialog();
	}
	
	render (){
		return (
			<div className = "rootComponentContainer">
				<Menu tongleMenu = {this.tongleMenu}/>
				<div id="app_cont">
			        <ProdContainer 
			        	products = {this.props.order && this.props.order.prods }
			        	payForm = {this.props.order && this.props.order.payForm}
			        	orderDisc = {this.props.order.disc}
			        	showMenu = {this.state.showMenu}
			        	d_active = {this.state.active}
			        	d_dialogType = {this.state.dialogType}
			        />
				</div>
				<Slider 
					active = {this.state.showMenu}
					tongleMenu = {this.tongleMenu}
					showPayFormsDialog = {this.showPayFormsDialog}
					showDiscountDialog = {this.showDiscountDialog}
					showOrderCommentDialog = {this.showOrderCommentDialog}
					showDeliveryDialog = {this.showDeliveryDialog}
					OutOrder = {this.OutOrder}
					status = {this.props.order.status}
				/>

				<Dialog
					className = "OrderDialog"
					active={this.state.active}
					onEscKeyDown={this.closeDialog}
          			onOverlayClick={this.closeDialog}
				>
				{
					 this.state.active ?
						<OrdersDialog
							type={this.state.dialogType}
							close ={this.closeDialog}
							okListener = {this.getDialogOkLoastener()}
							answers = {this.getDialogAlternatives()}
							answer = {this.getDialogAnswer()}
						/>:""
				}
					
				</Dialog>


				<Snackbar
						className = "ERROR_DIALOG"
						action='Dismiss'
						active={this.state.errror}
						label={this.state.error_title}
						timeout={2000}
						onClick={this.handleSnackbarClick}
						onTimeout={this.handleSnackbarClick}
						type='accept'
					/>
			</div>
		)
	}

	getDialogOkLoastener(){
		switch(this.state.dialogType){
			case 1:
				return this.changePayForm;
			case 2:
				return this.changeDiscount;
			case 3:
				return this.changeOrderComment;
			case 4:
				return this.changeDelivery;
			default :
				return ()=>{};
		}
	}

	getDialogAlternatives(){
		switch(this.state.dialogType){
			case 1:
				return this.props.order.payForms.map(pf=>{
					const {payform} = pf;
					return this.props.PayForms && this.props.PayForms[payform] ;
				});
			case 2:
				let arr =[];
				for (let y =0 ; y < this.props.order.payForms.length; y++){
					const pf = this.props.order.payForms[y];
					if(pf.payform == this.props.order.payForm){
						
						arr = [...pf.discounts];
					}
				}
				return arr;
			case 3:
				return '';
			case 4:
				return deloveryForms || [];
			default :
				return null;
		}
	}
	getDialogAnswer(){
		switch(this.state.dialogType){
			case 1:
				return this.props.order.payForm;
			case 2:
				return this.props.order.disc || 0;
			case 3:
				return this.props.order.comment || '';
			case 4:
				return this.props.order.delivery || 0;
			default :
				return null;
		}
	}


}



























