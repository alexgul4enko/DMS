import React , {Component, PropTypes,Children } from 'react';
export default class List extends Component {
	constructor(props){
		super(props);
		this.state = {
			filter:'',
		}
		this.renderFilter = this.renderFilter.bind(this);
		this.filter = this.filter.bind(this);
		this.renderList = this.renderList.bind(this);
		
	}
	render(){
		return(
			<div className = {`FiltList ${this.props.class}`}>
				{
					this.renderFilter()
				}
				<div className = "FiltListContent">
					{this.renderList()}
				</div>

			</div>
		)
	}
	renderList(){
		if (!this.state.filter){
			return this.props.items.map((item,key)=>this.props.renderItem(item,key));
		}
		else{
			return this.props.items.filter(item=>{
					return this.props.filter(item, this.state.filter);
				})
				.map((item,key)=>this.props.renderItem(item,key));
		}

		
	}
	renderFilter(){
		if(!this.props.filter) return null;
		return (
				<input 
					type = "search"
					defaultValue = {this.state.filter}
					onChange = {this.filter}
					placeholder = {this.props.filterPlaceHolder}
				/>
		)
	}
	filter(e){
		this.setState({filter:e.target.value});
	}
}

List.defaultProps = {
	class:'',
	items : [],
	filterPlaceHolder: 'search',
}

List.propTypes = {
	class: PropTypes.string,
	items : PropTypes.array,
	filter: PropTypes.func,
	renderItem: PropTypes.func.isRequired,
	filterPlaceHolder : PropTypes.string,
}

