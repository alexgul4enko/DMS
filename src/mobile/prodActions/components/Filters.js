import React , {Component, PropTypes } from 'react';


export default  class Filters  extends Component {


	textFilter(event){
		this.props.handleTextFilter(event.target.value);
	}
	render(){
		return (
			<div className = "prodFilter" >
			   <input 
			   		type="search" 
			   		name = "dsd"
			   		value = {this.props.textVal}
			   		placeholder = "Фильтр"
			   		onChange = {this.textFilter.bind(this)}
			   />
			   <nav 
			   		className = "material-icons"
			   		onClick = {this.props.tongleAll}>
			   		{this.props.tongles ? 'keyboard_arrow_up':'keyboard_arrow_down'}
			   </nav>
			</div>
		)
	}
		
} 
Filters.defaultProps = {
	textVal:'',
	tongles:false,
}

Filters.propTypes = {
	textVal: PropTypes.string, 
	handleTextFilter: PropTypes.func.isRequired,
	tongles:PropTypes.bool,
	tongleAll: PropTypes.func.isRequired,
}

