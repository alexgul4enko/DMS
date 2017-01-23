import React, {Component , PropTypes} from 'react';
import Menu from '../../Menu/Menu.js';
import Filters from './Filters';
import ProdActionsList from './ProdActionsList';
import ProdActionDialog from '../../dialogs/ProdActionDialog';
import Dialog from 'react-toolbox/lib/dialog'; 
import {  Snackbar } from 'react-toolbox';
import { browserHistory } from 'react-router';

export default class ProdActionComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			textVal : '',
			tongles: false,
			active: false,
			act:null,
			active_ :false,
		}
		this.handleTextFilter = this.handleTextFilter.bind(this);
		this.tongleAll = this.tongleAll.bind(this);
		this.filterProducts = this.filterProducts.bind(this);
		this.getActions = this.getActions.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.handleSnackbarClick = this.handleSnackbarClick.bind(this);
		this.showError = this.showError.bind(this);
		this.saveAnswer = this.saveAnswer.bind(this);
	}

	saveAnswer (answer, act){
		const {ln, lg} = this.props.GPS;
		const date = new Date();
		this.props.saveAnswer({...act,answer:{answer, ln,lg,date} });
		this.setState({active:false,act:null});
	}

	handleSnackbarClick(){
		this.setState({active_:false});
	}

	showError(){
		this.setState({active_:true});
	}

	openDialog(act){
		if(act && act.act && act.act == 7 ){
			browserHistory.push({
									pathname: '/Camera',
									state: {action: {...act, answer:act.answer && act.answer.answer}, router: this.props.location.state.router}
								});
		}
		else{
			this.setState({active:true,act});
		}
		
	}
	closeDialog(){
		this.setState({active:false,act:null});
	}

	handleTextFilter(textVal){
		this.setState({textVal});
	}
	tongleAll() {
		this.refs.productList.tongle(!this.state.tongles);
		this.setState({tongles: !this.state.tongles});

	}

	filterProducts(){
		if (!this.props.ProdActions || !Array.isArray(this.props.ProdActions) ){
	 		return [];
	 	}
	 	if(!this.state.textVal){
	 		return this.props.ProdActions || [];
	 	}
	 	return this.props.ProdActions.filter(pr=>{
	 		const {name} = pr;
	 		return name && name.toLowerCase().includes(this.state.textVal.toLowerCase());
	 	})
	}

	getActions (){
		const action = this.props.location.state.action;
		return  action.ans.split(', ').map(key=>{
			const {[key] : g} = this.props.All_acts;
			return {...g, key: action.key}
		})

	}

	render(){
		return (
			<div className = "rootComponentContainer">
				<Menu/>
				<div id="app_cont" className = "prodActions">
					<Filters 
						textVal = {this.state.textVal}
						tongles = {this.state.tongles}
						tongleAll = {this.tongleAll}
						handleTextFilter = {this.handleTextFilter}
					/>
					<ProdActionsList
						actions = {this.getActions()}
						ref = "productList"
						tongles = {this.state.tongles}
						products = {this.filterProducts()}
						openDialog = {this.openDialog}
					/>
				</div>
				<Dialog
					active = {this.state.active}
					onEscKeyDown={this.closeDialog}
          			onOverlayClick={this.closeDialog}
          			className = "ActionsDialog_"
				>
					<div className = "SyncDialog">
						<ProdActionDialog
							closeDialog = {this.closeDialog}
							question = {this.state.act && this.state.act.quest}
							type = {this.state.act && this.state.act.act}
							alternatives = {this.state.act && this.state.act.ans}
							showError = {this.showError}
							saveAnswer = {this.saveAnswer}
							act = {this.state.act}
							answer = {this.state.act && this.state.act.answer && this.state.act.answer.answer}
						/>
					</div>
				</Dialog>
				<Snackbar
					className = "ERROR_DIALOG"
					action='Dismiss'
					active={this.state.active_}
					label='Дайте ответ'
					timeout={1000}
					onClick={this.handleSnackbarClick}
					onTimeout={this.handleSnackbarClick}
					type='accept'
				/>
			</div>
		)
	}
}

ProdActionComponent.propTypes = {

}

