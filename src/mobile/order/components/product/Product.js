import React , {Component, PropTypes} from 'react';
import './producComponent.css';
import WHDialog from './WHDialog';
import HistoryDialog from './HistoryDialog';


export default class Product extends Component{
	constructor(props){
		super(props);
		
		this.state={
			dd:false,
			hist:false,
			ordd:false,
		}
		this.setStocks = this.setStocks.bind(this);
		this.showWHDialog = this.showWHDialog.bind(this);
		this.closeWHDialog = this.closeWHDialog.bind(this);
		this.closeHistoryDialog = this.closeHistoryDialog.bind(this);
		this.openHistoryDialog = this.openHistoryDialog.bind(this);
		this.calculateOrder = this.calculateOrder.bind(this);
		this.setOrder = this.setOrder.bind(this);
		this.openOrderDialog = this.openOrderDialog.bind(this);
		this.closeOrderDialog = this.closeOrderDialog.bind(this);
	}

	closeHistoryDialog(){
		this.setState({hist:false,});
	}
	openHistoryDialog(){
		this.setState({hist:true,});
	}
	showWHDialog(){
		this.setState({dd:true,});
	}
	closeWHDialog(){
		this.setState({dd:false,});
	}
	setStocks(stocks){
		if(stocks){
			const st = stocks.includes('.') ? parseFloat(stocks) :parseInt(stocks);
			this.props.setStocks(this.props.id, st);
		}
		this.setState({dd:false,});
	}

	setOrder(order){
		const qty = order? parseInt(order) : 0;
		const disc = this.props.discount;
		const pr = this.props.price;
		const id = this.props.id;
		const sum = qty*pr;
		const sumD = disc? sum*(1-disc/100):sum;

		this.props.setOrder(id, qty,sum, disc,sumD);
		this.setState({ordd:false,});
	}

	calculateOrder(){
		if(this.props.stock || this.props.stock ==0){
			return this.props.qty || 0;
		}
	}
	openOrderDialog(){
		console.log(this.props.stock);
		if(this.props.stock || this.props.stock  ===0 ){
			this.setState({ordd:true,});
		}
		
	}
	closeOrderDialog(){
		this.setState({ordd:false,});
	}

	
}

Product.defaultProps = {
	pic:"-",
	price:0,
	discount:0,
	stock:0,
	qty:0,
	sum:0,
	sumD:0,
}












