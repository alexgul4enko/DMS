import React , {Component , PropTypes} from 'react';
import OrderProduct from "./OrderProduct";
import './prodGroup.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

export default  class ProdGroup extends Component{
	constructor(props){
		super(props);
		this.state = {
			tongle:true,
		}
		this.TongleGroup = this.TongleGroup.bind(this);
	}


	TongleGroup (){
		this.setState({tongle : !this.state.tongle});
	}
	render(){
		return (
			<div className = {`prodGroup${(this.props.children && this.props.children.length)? '' :' hidden'}`}>
				<div className = "prodGroupTitle" >
					<span className = "title" onClick = {this.TongleGroup}>{this.props.name}</span>
					<span 
						onClick = {this.TongleGroup}
						className = "material-icons"
					>
						{this.state.tongle? "expand_more" : "expand_less"}

					</span>
				</div>
				<div className = "groupContent">
					<ReactCSSTransitionGroup
						transitionName="products"
						transitionEnterTimeout={200}
						transitionAppear={true}
						transitionAppearTimeout={200}
						transitionLeaveTimeout={200}>
						{this.state.tongle? this.props.children : null}
					</ReactCSSTransitionGroup>
				</div>

			</div>
		)
	}
}
ProdGroup.defaultProps ={
	arr:[],
}


ProdGroup.propTypes = {
	name :PropTypes.string.isRequired,
	arr :PropTypes.array.isRequired,
	payForm:PropTypes.number.isRequired,
}




function Test (props){
	return <div > {props.name}</div>
}








