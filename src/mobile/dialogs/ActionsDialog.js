import React, {Component , PropTypes } from 'react';
import ActionsButtons from './components/ActionsButtons';
import DialogHeader from './components/DialogHeader';
import DialogContent from './components/DialogContent';
import './actionsdialog.css';

export default class ActionsDialog extends Component{
	constructor(props){
		super(props);
		this.saveAnswer = this.saveAnswer.bind(this);
	}
	render(){
		return (
				<div className = "ActionsDialog">

					<DialogContent 
						ref = "DialogContent"
						rejected = {this.props.rejected}
						type = {this.props.type}
						question = {this.props.question}
						alternatives = {this.props.alternatives}
						reject = {this.props.reject}
						answer = {this.props.answer}

					/>
 
					<ActionsButtons 
							switchDialog = {this.props.switchDialog}
							saveAnswer = {this.saveAnswer}
							reject = {this.props.rejected}/>
				</div>
		)
	}

	saveAnswer(){
		const ans = this.refs.DialogContent.getAnswer();
		if(this.props.type == 1 && !ans){
			this.props.showError();
		}
		else if(this.props.type == 2 && !ans){
			this.props.showError();
		}
		else if(this.props.type == 6 && !ans){
			this.props.showError();
		}
		else if(this.props.rejected && !ans){
			this.props.showError();
		}
		else{
			this.props.saveAnswer(ans,this.props.rejected ? true : false ,this.props.type,this.props.actionKey);
		}
		
	}
}


ActionsDialog.propTypes = {
	switchDialog:PropTypes.func.isRequired,
	reject:PropTypes.bool,
}