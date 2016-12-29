import React, { Component } from 'react'
import {Link} from 'react-router'
import Main_menu from './Main_menu'
import './style/Actions_style.css'
import TTActions from './Actions/TTActions'
import Dialog from 'react-toolbox/lib/dialog';
import { browserHistory } from 'react-router'
import Visit from './Actions/Visit'
import Reject_Dialog from './Actions/Reject_Dialog'
import Dialog_type from './Actions/Dialog_type'
import {  Snackbar } from 'react-toolbox';



class Actions extends Component {
	constructor(){
		super();
		this.state={
			TT:null,
			Actions: [],
			action:null,
			active:false,
			reject:false,
			alert:false,
			alert_Text:''
		}
		this.goToCamera = this.goToCamera.bind(this);
		this.goToProducts = this.goToProducts.bind(this);
		this.goToOrders = this.goToOrders.bind(this);
		this.showDialog  = this.showDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.rejectDialog = this.rejectDialog.bind(this);
		this.saveAnswer = this.saveAnswer.bind(this);
		this.returnfromReject = this.returnfromReject.bind(this);
		this.showAlert = this.showAlert.bind(this);
		this.dismissAler = this.dismissAler.bind(this);
	}

	showAlert(text){
		this.setState({alert:true, alert_Text:text});
	}
	dismissAler(){
		this.setState({alert:false});
	}



	goToCamera(act){
		 this.props.actions.setCameraByTT(act);
		 browserHistory.push('Camera');
		 this.props.actions.backstage('Actions');
	}
	goToProducts(){
		 browserHistory.push('ProdActions');
		 this.props.actions.backstage('Actions');
	}
	goToOrders(){
		 browserHistory.push('Orders');
		 this.props.actions.backstage('Actions');
	}
	showDialog(event ){
		this.setState({action:event,active:true});
	}
	rejectDialog(){
		this.setState({reject:true});
	}
	returnfromReject(){
		this.setState({reject:false});
	}
	saveAnswer(val){

		if(this.state.action.act == "WriteVisit"){

			navigator.geolocation.getCurrentPosition(
				(coords)=>{
					this.props.actions.saveVisit({
													val:val, 
													tt:this.props.flow.TT,
													ln:coords.coords.latitude,
													lg:coords.coords.longitude
												});

				},
				(err) =>{
					console.log(err);
				}
			);
			
		}
		else {
			this.props.actions.saveTTAnswer({
				val:val,
				tt:this.props.flow.TT,
				action:this.state.action,
				rej:this.state.reject
			});
		}
		this.setState({action:null,active:false,reject:false});
	}
	closeDialog(){
		this.setState({action:null,active:!this.state.active,reject:false});
	}


	render(){

		const DialogContent =  ()=>{
			if(this.state.active){
				if(this.state.reject){
					return <Reject_Dialog
								returnfromReject = {this.returnfromReject}
								showDialog = {this.showAlert}
								saveanswer = {this.saveAnswer}
								lastAns = {this.state.action.act !== "WriteVisit" ?
													this.props.TTAnswers[this.state.action.key]
												    : false}/>
				}
				else if (this.state.action.act == "WriteVisit" ){
					return <Visit 
								saveanswer = {this.saveAnswer}
								reject = {this.rejectDialog}

								/>
				}
				else{
					return <Dialog_type
							quest = {this.state.action}
							saveanswer = {this.saveAnswer}
							reject = {this.rejectDialog}
							showDialog = {this.showAlert}
							answers = {this.props.TTAnswers[this.state.action.key]}
						/>
				}
			}
			else return ""
		}
		return ( 
			<div className = "app">
				<Main_menu 
						goBack = {this.props.actions.goBack}
						fullScrean = {this.props.actions.fullScrean}
						prevStage = {this.props.flow.backStage}
						/>
				<div className="Content">
				{
					this.state.Actions.map((action,id)=>{
						
						if(action.act && action.act == "WriteVisit"){
							return <TTActions  key={id}
										action = {action}
										checked = {this.props.visitInfo[this.state.TT.id] ? true: false}
										question = {'Записать визит'}
										click = {this.showDialog}/>

						}
						else if (action.act && action.act == "multipleBYProducts"){
							return <TTActions key={id}
										action = {action}
										question = {'Задания по продуктам'}
										click = {this.goToProducts}/>
						}
						else{
							return <TTActions key={id}
										checked = {this.props.TTAnswers[action.key]? true :false}
										action = {action}
										question = {action.quest }
										click = { 
												action.type == 1 
															?  action.act===7
																	? this.goToCamera.bind(this,action)
																	: this.showDialog
															:   action.act===11
																	? this.goToOrders
																	: this.goToProducts
												}/>
						}

					})
				}
				</div>
				<Dialog
					  actions={[]}
			          active={this.state.active}
			          onEscKeyDown={this.closeDialog}
			          onOverlayClick={this.closeDialog}
			          
		        	>
		        	{DialogContent()}
		        </Dialog>
		        <Snackbar
			          action='Dismiss'
			          active={this.state.alert}
			          icon='error'
			          label={this.state.alert_Text}
			          timeout={2000}
			          onClick={this.dismissAler}
			          onTimeout={this.dismissAler}
			          type='warning'
			        />
			</div>
		)
	}

	componentDidMount() {
		let RouteMagazine = this.props.Magazine[this.props.flow.TT];
		let RouteActions = this.props.ttActions[this.props.flow.TT].acts;
		let ActionsFull = [];
		RouteActions.map((action)=>{
			ActionsFull.push(Object.assign({},
					this.props.Actions[action.act],
					{key : action.key}
				))
		});
		let finalActionsList = [];
		finalActionsList.push({act: "WriteVisit"});

		let groupByProducts={actions:[],quest:"Задания по продуктам", act:"multipleBYProducts"};
		ActionsFull.map((action)=>{
			//by TT
			if(action.type == 1){
				finalActionsList.push(action);
			}
			//fixed by products
			else if(action.type != 1 && action.fix == 1){
				finalActionsList.push(action);
			}
			//allt
			else{
				groupByProducts.actions.push(action);
			}
		});

		if(groupByProducts.actions){
			finalActionsList.push(groupByProducts);
		}

		if(finalActionsList.length>1){
			finalActionsList[finalActionsList.length-1].last = true;
		}

		this.setState({TT:RouteMagazine,Actions:finalActionsList});
		
	}


}



export default Actions;