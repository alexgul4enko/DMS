import React , {Component , PropTypes} from 'react';
import ProdGroup from './ProdGroup';


export default  class  ProductsFilter  extends Component{
	constructor (props){
		super(props);
	}


	render(){
		return(
			<div className = "filters">
					<input type = "text"  
						onChange = {this.props.handleTextFilter}
						placeholder = "filter" 
						className = "OrdersFilter"
						value = {this.props.search}
					/>

					<span 
						className = "material-icons"
						onClick = {this.props.handleCheckFilter}
					>
						{this.props.checked ? 'check_box' : 'check_box_outline_blank'}
					</span>
				</div>
		)
	}
}


ProductsFilter.defaultProps = {
	checked : false,
	search:"",
}
ProductsFilter.propsTypes = {
	handleTextFilter:PropTypes.func.isRequired,
	handleCheckFilter:PropTypes.func.isRequired,
	checked:PropTypes.bool.isRequired,
	search:PropTypes.string.isRequired,
}



