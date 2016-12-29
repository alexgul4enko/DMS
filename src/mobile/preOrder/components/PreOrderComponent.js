import React , {Component,PropTypes} from 'react';
import Menu from '../../Menu/Menu';
import NewOrderButton from './NewOrderButton';
import OrdersList from './OrdersList';
import uuid from 'uuid-js';
import {  Snackbar } from 'react-toolbox';
import OrderView from '../../OrdersComponents/OrderView';
import CreatingOrder from './CreatingOrder';

export default class PreOrderComponent extends Component{

	constructor(props){
		super(props);
		this.state = {
			active_:false,
			startLoad : false,
		}

		this.createOrder = this.createOrder.bind(this);
		this.handleSnackbarClick = this.handleSnackbarClick.bind(this);
		this.showError = this.showError.bind(this);
	}

	showError(){
		this.setState({active_:true});
	}

	handleSnackbarClick (){
		this.setState({active_:false});
	}

	createOrder(){
		this.setState({startLoad:true});
		//created Date
		const date = new Date();
		//Generate order ID
		const id = uuid.create(4).toString();
		//routeID
		const RID = this.props.location.state;
		//magazineID
		const MId = this.props.Routes[RID].ttid;
		//magazineName && magazinePayForms
		const {name,payForms} = this.props.Magazines[MId] || {};
		if(payForms && payForms[0]  && payForms[0].payform){
			this.props.AddOrder({MId, RID,id,date});
		}
		else{
			this.setState({startLoad:false});
			this.showError();
		}
	}



	render(){
		return (
				<div className = "rootComponentContainer">
					<Menu/>
					<div id="app_cont">
						<NewOrderButton createOrder = {this.createOrder}/>
						<OrdersList>
							{
								this.props.Orders.map(data=>{

									return  data.RID ==this.props.location.state ?
											<OrderView
												key = {data.id}
												name = {data.name}
												comment = {data.comment}
												id= {data.id}
												payForm = {this.props.PayForms[data.payForm].name}
												status = {data.status}
												delivery = {data.delivery}
												prod = {data.prod}
												sum = {data.sum}
												sum_d = {data.sumDisc}
												qty = {data.qty}
												date = {data.date}
												order = {data}
											/> :""
								})
							}
						</OrdersList>
					</div>
					{
						this.state.startLoad ? <CreatingOrder/>:""
					}

					<Snackbar
						className = "ERROR_DIALOG"
						action='Dismiss'
						active={this.state.active_}
						label='ТТ не имеем форм оплаты('
						timeout={1000}
						onClick={this.handleSnackbarClick}
						onTimeout={this.handleSnackbarClick}
						type='accept'
					/>
				</div>

		)
	}


	componentWillMount() {
		this.props.initGpsLocations();
	}



}