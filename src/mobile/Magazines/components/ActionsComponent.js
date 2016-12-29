import React, {Component, PropTypes} from 'react';



export default class  ActionsComponent extends Component{
	constructor(props){
		super(props);
		this.clickAction = this.clickAction.bind(this);
	}
	render(){
		let check_box = (this.props.act.answer ||
								(this.props.act.answer===0 && this.props.act.act >0) ) ? "check_box" : "check_box_outline_blank";
		const class_ = (this.props.act.answer ||
								(this.props.act.answer===0 && this.props.act.act >0) )  ? "material-icons checked" : "material-icons";

		if(this.props.act.act ==11){
			check_box = "store_mall_directory"
		}
		if(this.props.act.act ==-19){
			check_box = "local_grocery_store"
		}
		return (
			<div
				onClick = {this.clickAction} 
				className = "ActionComponent">
				<span className = {class_}>{check_box}</span>
				<span className = "question">{this.props.act.quest}</span>
			</div>
		)
	}

	clickAction (){
		this.props.click(this.props.act);
	}
}


