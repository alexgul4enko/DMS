import React , {Component , PropTypes} from 'react';
import ProdGroup from './ProdGroup';
import ProductsFilter from './ProductsFilter';
import TotalFooter from './TotalFooter';
import OrderProduct from './OrderProduct';


export default  class  ProducsList  extends Component{
	constructor (props){
		super(props);
		this.state = {
			checked : false,
			search : "",
		}
		this.handleTextFilter = this.handleTextFilter.bind(this);
		this.handleCheckFilter = this.handleCheckFilter.bind(this);
	}

	handleCheckFilter (){
		this.setState({checked : !this.state.checked});
	}
	handleTextFilter(e){
		this.setState({search:e.target.value});
	}

	render(){
		// console.log('render')
		return(
			<div className = "ProdList">
				<ProductsFilter 
					handleTextFilter = {this.handleTextFilter}
					handleCheckFilter = {this.handleCheckFilter}
					checked = {this.state.checked}
					search ={this.state.search}
				/>
				<div className = "LIST">
					{
						this.props.groups.map((data,key)=>{

							const s =data.arr.filter(prod=>{
												let filt = true;
												const {name ="", qty} = prod;
												if(this.state.checked && !qty){
													filt = false;
												}
												if(this.state.search 
													&& !name.toUpperCase().includes(this.state.search.toUpperCase())){
													filt = false;
												}
												return filt
											}).
											map(prod=>{
												return (<OrderProduct 
						 										color = {prod.color}
										 						key = {prod.id}
										 						aarID ={prod.key}
										 						name = {prod.name}
										 						pic = {prod.pic}
										 						price = {prod.prices && prod.prices[this.props.payForm]&& prod.prices[this.props.payForm].pr || 0}
										 						discount = {this.props.orderDisc ? this.props.orderDisc :
										 							 prod.prices && prod.prices[this.props.payForm]&& prod.prices[this.props.payForm].disc || 0}
										 						id ={prod.id} 
										 						history = {prod.history}
										 					/>)
											})

								return <ProdGroup
											key={key}
											name = {data.cat}
											payForm = {this.props.payForm}
											orderDisc  ={this.props.orderDisc}
										>
										{s}
										</ProdGroup>
							})
					}
				</div>
				<TotalFooter/>
			</div>
		)
	}
}


ProducsList.defaultProps = {
	groups : [],
}
ProducsList.propsTypes = {
	groups : PropTypes.array,
}
