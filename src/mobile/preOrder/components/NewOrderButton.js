import React , {Component,PropTypes} from 'react';



export default class NewOrderButton extends Component{
	constructor(props){
		super(props);
		this.state = {
			act:true,
		}
		this.handleClick = this.handleClick.bind(this);
	}


	handleClick(){
		if(this.state.act){
			this.props.createOrder();
			this.setState({act:!this.state.act});
		}
		

	}
	render(){
		return (
			<div className  = "NewOrderButton" >
				<span className="material-icons" onClick = {this.handleClick}>add_circle</span>
				<span className="S " onClick = {this.handleClick}>Создать заказ</span>
			</div>
		)
	}
		
}


NewOrderButton.propTypes = {
	createOrder: PropTypes.func.isRequired,
}