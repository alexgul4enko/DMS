import React , {Component, PropTypes} from 'react';

// import Product from './product/Product'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './product/actions';

import './product/producComponent.css';
import WHDialog from './product/WHDialog';
import HistoryDialog from './product/HistoryDialog';

class OrderProduct extends Component{
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
		if(this.props.status && this.props.status==1){
			this.setState({dd:true,});
		}
		
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
		if(this.props.status && this.props.status==1){
			if(this.props.stock || this.props.stock  ===0 ){
				this.setState({ordd:true,});
			}
		}
	}
	closeOrderDialog(){
		this.setState({ordd:false,});
	}




	render(){
		return (
			<div className = "product" style={{backgroundColor:`RGB(${this.props.color})`}}>
				<div className = "title">
					{this.props.name}
				</div>

				<div className = "content">
					<div className = "image" 
							style = {{"backgroundImage" :`url(/Image/${this.props.pic})`}}
					> 
					</div>
					<div className = "ProdData">
						<div className = "ProdPrices">
							<span>{`Цена: ${this.props.price.toFixed(2)}`}</span>
							<span>{`Скид: ${this.props.discount.toFixed(2)}%`}</span>
						</div>
						<div className = "ProdPrices">
							<span>{`Скл: ${this.props.WH}`}</span>
							<span onClick={this.showWHDialog}>{`Ост: ${this.props.stock || 0}`}</span>
						</div>
					</div>
				</div>

				<div className = "work">
					<span 
						className = {`material-icons ${this.props.history && this.props.history.length ?
															'' : "grey"}` }
						onClick = {this.props.history && this.props.history.length ? this.openHistoryDialog :
										()=>{}}
					>
						{'insert_chart'}
					</span>
					<span className = "orderQTY" onClick = {this.openOrderDialog}>{`К-во: ${this.props.qty || 0}`}</span>
					<span className = "orderQTY">{`$ : ${this.props.sum?this.props.sum.toFixed(2) : '0.00'}`}</span>
					<span className = "orderQTY">{`% : ${this.props.sumD?this.props.sumD.toFixed(2) : '0.00'}`}</span>
				</div>

				{
					this.state.dd? <WHDialog 
										dismis = {this.closeWHDialog}
										okPress = {this.setStocks}
										value = {this.props.stock }
									/>: ""
				}
				{
					(this.state.hist && this.props.history && this.props.history.length )?
						             <HistoryDialog 
										dismis = {this.closeHistoryDialog}
										history = {this.props.history || []}
									/>: ""
				}
				{
					this.state.ordd ?
						             <WHDialog 
										dismis = {this.closeOrderDialog}
										okPress = {this.setOrder}
										value = {this.calculateOrder() }
									/>: ""
				}
				
			</div>
		)
	}
}




OrderProduct.defaultProps = {
	pic:"-",
	price:0,
	discount:0,
	qty:0,
	sum:0,
	sumD:0,
}


OrderProduct.propTypes = {
	name:PropTypes.string.isRequired,
	pic: PropTypes.string.isRequired,
	price:PropTypes.number.isRequired,
	discount:PropTypes.number.isRequired,
	color:PropTypes.string.isRequired,
	
	

}



function mapStateToProps(state = {} ,props) {
	const {aarID} = props;
	const pr = state.order.prods[aarID];
	return  {
		WH : state.WH[props.id] && state.WH[props.id].qty || 0,
		stock:  state.Stocks && state.Stocks[props.id] ,
		qty : pr.qty||0,
		sum : pr.sum||0,
		sumD: pr.sumD||0,
		status: state.order.status,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderProduct);








