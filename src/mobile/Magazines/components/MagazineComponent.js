import React, {Component, PropTypes} from 'react';
import Menu from '../../Menu/Menu.js'
import ActionsComponent from './ActionsComponent';
import '../magazines.css';
import Dialog from 'react-toolbox/lib/dialog';
import { browserHistory } from 'react-router';
import ActionsDialog from '../../dialogs/ActionsDialog';
import {  Snackbar } from 'react-toolbox';

export default class MagazineComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			active_:false,
		};
		this.prepareActions = this.prepareActions.bind(this);
		this.handleActionClick = this.handleActionClick.bind(this);
		this.handleSnackbarClick = this.handleSnackbarClick.bind(this);
		this.showError = this.showError.bind(this);
		
	}


	showError (){
		this.setState({active_:true});
	}
	

	handleSnackbarClick(){
		this.setState({active_:false});
	}



	render (){
		const actions = this.prepareActions();
		return (
			<div className = "rootComponentContainer">
				<Menu/>
				<div id="app_cont">
					{actions}
				</div>

				<Dialog
					className = "ActionsDialog_"
					active={this.props.dialog.active || false}
					onEscKeyDown={this.props.closeDialog}
					onOverlayClick={this.props.closeDialog}
					title=''
					>
						<div className = "SyncDialog">
							<ActionsDialog 
								rejected = {this.props.dialog.rejected}
								type = {this.props.dialog.type}
								question = {this.props.dialog.quest}
								alternatives = {this.props.dialog.ans}
								answer = {this.props.dialog.answer}
								reject = {this.props.dialog.reject}
								switchDialog = {this.props.switchDialog}
								saveAnswer = {this.props.saveAnswer}
								actionKey = {this.props.dialog.key}
								showError = {this.showError}
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



	handleActionClick ( action){
		if(action && action.type){
			switch (action.type){
				case -12:
					this.props.openDialog(action, false);
					break;
				case -19:
					browserHistory.push("/Stocks");
					break;
				case -11:
					browserHistory.push("ProdActions/mult")
					break;
				case 2:
					if(action.act == 11){
						browserHistory.push({
											pathname: '/Orders',
											state: this.props.router.id
									});
						break;
					}
					else{
						browserHistory.push(`/ProdActions/${action.key}`);
							break;
					}
					
				case 1:
					if(action.act == 7){
						browserHistory.push({
											pathname: '/Camera',
											state: {action, router: this.props.router}
									});
						break;
					}
					else{
						this.props.openDialog(action, action.reject)
						break;
					}
				default:
					break;

			}
		}
		this.setState({active:true, action});
	}




	prepareActions(){
		let actions = [];
		let is_mult = false;
		let is_muls_ans = false;
		if(!this.props.router){
			return actions;
		}
		actions.push({
						type:-12, 
						act: -12,
						quest:"Записать визит", 
						ans: this.props.router.reject,
						reject:  this.props.router.reject ? true : false ,
						key:{...this.props.router},
						answer :this.props.router.reject || this.props.router.isVisit,
					});
		


		if(this.props.router && this.props.router.actions && this.props.acts){
			this.props.router.actions.map(data=>{
				const {act, id} = data;
				const action = this.props.acts[act];
				if(action  && action.type== 1){
					const answer =  this.props.tt_ans && this.props.tt_ans[id] && this.props.tt_ans[id].ans;
					const reject = this.props.tt_ans && this.props.tt_ans[id] && this.props.tt_ans[id].reject;
					actions.push({...action, 
										key:id, 
										answer,
										reject });
				}
				else if(action  && action.type == 2){
					if (action.fix == 1){
						if (action.act==11){
							actions.push({
								type:-19, 
								act: -19,
								quest:"Снять остатки", 
								ans: true,
								key:{...this.props.router},
								answer :this.props.Stocks ?  true : false,

							});
						}

						const answer =  (this.props.tt_ans && this.props.tt_ans[id] && this.props.tt_ans[id]) ? true : false;
						actions.push({...action, 
											key:id, 
											answer
											 });


					}
					else{
						is_mult = true;
						if(this.props.tt_ans && this.props.tt_ans[id] && this.props.tt_ans[id]){
							is_muls_ans = true
						}
					}
				}



			});
		}

		if(is_mult){
			actions.push({
						type:-11, 
						quest:"Задания по продуктам", 
						ans: is_muls_ans,
						reject: false
					});
		}

		return actions.map ((act, id)=>{
			return <ActionsComponent
						key = {id}
						act = {act}
						click = {this.handleActionClick}
					/>
		})



	}

	componentWillMount() {
		this.props.initGpsLocations();
	}
}

