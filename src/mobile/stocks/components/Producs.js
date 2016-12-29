
import  React , {Component, PropTypes} from 'react';
import './prod.css';

export default class Producs extends Component{
	constructor(props){
		super(props);
		this.handleClick =this.handleClick.bind(this);
	}
	handleClick(){
		this.props.openDialog(this.props.id, this.props.qty || 0);
	}
	render(){
		return (
			<div className = "STproduct" style={{backgroundColor:`RGB(${this.props.color})`}}>
				<div 
					className = "image" 
					style = {{"backgroundImage" :`url(/Image/${this.props.pic})`}}
				>
				</div> 
				<div className = "STprodName">{this.props.name}</div>
				<div 
					onClick = {this.handleClick}
					className ="prStock"
				>
					<span>{this.props.qty || 0}</span>
				</div>
			</div>
		)
	}
}

Producs.defaultProps = {
	color : '92,106,112',
	pic : '-',
	qty:0,
}

Producs.propTypes = {
	color: PropTypes.string,
	pic : PropTypes.string,
	name:PropTypes.string,
	qty : PropTypes.any,
	id : PropTypes.number,
	openDialog : PropTypes.func.isRequired,
}