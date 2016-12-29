import React , {Component , PropTypes} from 'react';
import './prods.css';
import ProdGroup from "./ProdGroup";
import ProducsList from './ProducsList';


export default class ProdContainer extends Component{

	constructor(props){
		super(props);
		this.renderProducts = this.renderProducts.bind(this);
	}

	renderProducts(){
		// console.log("fucking big function");
		let grPr =[];
		let lasrtGR;
		this.props.products.map((prod,key)=>{
			const sales = prod.prices && prod.prices[this.props.payForm];
			if(sales) {
				if(lasrtGR!=prod.cat){
					lasrtGR = prod.cat;
					grPr.push({cat:lasrtGR, arr:[{...prod, key}]})
				}
				else{
					grPr[grPr.length-1].arr.push({...prod, key});
				}
			}
			
		})
		return grPr;

	}



	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.showMenu !=this.props.showMenu){
			return false;
		}
		if(nextProps.d_active !=this.props.d_active 
			&& nextProps.d_dialogType !=this.props.d_dialogType){
			return !nextProps.d_active && 
						(nextProps.payForm != this.props.payForm|| 
							nextProps.orderDisc != this.props.orderDisc)
		}
		else{
			return true;
		}
	}

	render (){
		return <ProducsList 
					groups = {this.renderProducts()}
					payForm = {this.props.payForm}
					orderDisc = {this.props.orderDisc}/>	
	}

}

ProdContainer.defaultProps = {
	products:[],
	payForm:0
}

ProdContainer.propsTypes ={
	products: PropTypes.array.isRequired,
	payForm: PropTypes.number.isRequired,
}




















