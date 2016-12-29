import  React , {Component, PropTypes} from 'react';
import './stocks.css';
import Menu from '../../Menu/Menu';
import Filter from './Filter';
import Groups from './Groups';
import Producs from './Producs';
import StockDialog from './StockDialog';
import Dialog from 'react-toolbox/lib/dialog';

export default class StocksComponent extends Component{

	constructor(props) {
		super(props);
		this.state = {
			text:'',
			check: false,
			active:false,
			data: null,
		}
		this.handleTextSeach = this.handleTextSeach.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.handleDialogAnswer  = this.handleDialogAnswer.bind(this);
	}




	handleTextSeach (e){
		this.setState({text: e.target.value});
	}

	handleCheck(){
		this.setState({check:!this.state.check});
	}

	openDialog(id, stocks){
		this.setState({active:true, data: {id, stocks} });
	}

	closeDialog(){
		this.setState({active:false, data:null});
	}

	handleDialogAnswer( stocks){
		this.props.setStocks({id:this.state.data.id, qty:stocks})
		this.closeDialog();
	}


	render() {

		const groups = this.props.products.map((data,key)=>{
			const {arr=[],title} = data;
			const products = arr.filter(pr=>{
				let filt = true;
				
				if(this.state.text && !pr.name.toUpperCase().includes(this.state.text.toUpperCase())){
					filt = false;
				}
				if(this.state.check){
					const {id} = pr;
					const st = this.props.Stocks && this.props.Stocks[id];
					if(st != 0 && !st){
						filt = false;
					}
				}
				return filt;
			}).map(add=>{
				const {id,color,name,pic} = add;
				const st = this.props.Stocks && this.props.Stocks[id] || 0;
				return <Producs
							key = {id}
							color = {color}
							pic = {pic}
							name ={name}
							id = {id}
							qty = {st}
							openDialog = {this.openDialog}
						/>
			})


			return <Groups
						key = {key}
						title={title}
						arr = {products}
					/>
		})

		

		return (
			<div className = "rootComponentContainer">
				<Menu/>
				<div id="app_cont" className = "stocks">
					<Filter
						handleTextFilter={this.handleTextSeach}
						search ={this.state.text}
						handleCheckFilter={this.handleCheck}
						checked = {this.state.check}
					/>
					<div className = "stocklist">
						{groups}
					</div>


				</div>
				<Dialog
					className = "STOCKS_DIALOG"
					active={this.state.active}
					onEscKeyDown={this.closeDialog}
	          		onOverlayClick={this.closeDialog}
				>
				{
					this.state.active ? (<StockDialog
												value = {this.state.data &&  this.state.data.stocks+'' || '0' }
												okPress = {this.handleDialogAnswer}
												closeDialog = {this.closeDialog}
											/>):null

				}

				</Dialog>

			</div>
		);
	}
}
StocksComponent.defaultProps ={
	products:[],
}

StocksComponent.propTypes ={
	
}