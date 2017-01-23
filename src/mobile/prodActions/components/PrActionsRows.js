import React ,{Component, PropTypes } from 'react'

export default class PrActionsRows extends Component{
	constructor(props){
		super(props);
		this.selectActions = this.selectActions.bind(this);

	}

	selectActions (){
		this.props.openDialog(this.props.act);
	}

	render(){
		return (
			<div 
				className = "ProductActionRowQuest"
				onClick = {this.selectActions}
			>
				<span>{this.props.question}</span>
				<nav 
					className = "material-icons"
					style = {{color:this.props.answered ?"#4caf50":"#f44336"}}
				>
					{this.props.answered ? 'done' : 'cancel' }
				</nav>
			</div>
		)
	}
}

PrActionsRows.defaultProps = {
	question:'',
	answered: false,
}

PrActionsRows.propTypes = {
	question : PropTypes.string,
	answered: PropTypes.bool,
}

