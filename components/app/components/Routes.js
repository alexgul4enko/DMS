import React, { Component } from 'react'
import {Link} from 'react-router'
import Main_menu from './Main_menu'
import './style/rountes.css'
import Map_List from './Map_List'
import Input from 'react-toolbox/lib/input';

import Sorter from '../../QuickSort'

import { browserHistory } from 'react-router'
import Dialog from 'react-toolbox/lib/dialog';
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css"

function sunday(day) {
  return day.getDay() === 0;
}

class Routes extends Component {
	constructor(props){

		super(props);
		this.state= {
			filt : "",
			dateffilt :"",
			ln: null,
			lg: null,
			gpsID: true,
			TTList:[],
			FiltList:[],
			active: false,
			selectedDay: null,
	
		}


		this.filter = this.filter.bind(this)
		this.date_filter = this.date_filter.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.handleDayClick = this.handleDayClick.bind(this);
		this.clearDay = this.clearDay.bind(this);
	}

	openDialog(){
		this.setState({active: !this.state.active});
	}
	handleDayClick(e, day, { selected, disabled }) {
		
	    if (disabled) {
	      return;
	    }
	    if (selected) {
	      this.setState({ selectedDay: null })
	    } else {
	    	if(day){
	    		this.setState({ selectedDay: day });
	    	}
	    }
  	}

  	clearDay(){
  		this.setState({ selectedDay: null });
  		this.openDialog();
  		this.setState({
  			FiltList:filterData(this.state.TTList,this.state.filt,null)
  		});

  	}
  	date_filter(){
		this.openDialog();
		this.setState({
  			FiltList:filterData(this.state.TTList,this.state.filt,this.state.selectedDay)
  		});
	}


	render(){
		return (<div>Routes</div>)
	}

	// render(){
	// 	const CalendarClass = this.state.selectedDay ? "material-icons MY Selected" : "material-icons MY";
	// 	return ( 
	// 		<div className="fullHeightl">
				
	// 			<Main_menu 
	// 					fullScrean = {this.props.actions.fullScrean}
	// 					prevStage = {this.props.flow.backStage}
	// 					goBack = {this.props.actions.goBack}
	// 					/>
	// 			<div className = "TT_filter">
	// 				<Input 
	// 					type='text' 
	// 					label='' 
	// 					name='name' 
	// 					icon='search'
	// 					value={this.state.filt} 
	// 					onChange={this.filter} 
	// 				/>
	// 				<div className={CalendarClass}
	// 					 onClick={this.openDialog}>&#xE8DF; 
	// 				</div>
	// 			</div>
	// 			<Dialog
	// 	          actions = {[
	// 						    { label: "Отмена", onClick: this.clearDay },
	// 						    { label: "Выбрать", onClick: this.date_filter }
	// 						  ]}
	// 	          active={this.state.active}
	// 	          onEscKeyDown={this.openDialog}
	// 	          onOverlayClick={this.openDialog}
	// 	        >
	// 	        	<DayPicker 
	// 	        		initialMonth={ this.state.selectedDay ? this.state.selectedDay : new Date() }
	// 	        		selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
	// 	        		onDayClick={ this.handleDayClick}
	// 	        	/>
	// 	        </Dialog>

	// 			<Map_List
	// 				flow={this.props.flow}
	// 				curLoc = { {ln:this.state.ln, lg: this.state.lg}}
	// 				TT = {this.state.FiltList}
	// 				Visits = {this.props.visitInfo}
	// 				selectTT = {this.props.actions.selectTT}
	// 			/>
				

	// 		</div>
			 
	// 	)
	// }


	
	componentDidMount(){
		// this.props.actions.gps_ON();
		// this.initTTList();
	}


	initTTList(){
		let less = function (a,b){
			if (a.today && !b.today){
				return true;
			}
			else if (a.today && b.today){
				return a.name < b.name;
			}
			else if (!a.today && b.today){
				return false;
			}
			else if (!a.today && !b.today){
				let a_day = new Date(a.visit);
				let b_day = new Date(b.visit);

				if(a_day.getDate() === b_day.getDate()
						&& a_day.getMonth() === b_day.getMonth()
						&& a_day.getYear() === b_day.getYear()){

					return a.name < b.name;
				}
				else{

					return a_day > b_day;
				}
			}
		}
		let TTList = [];
		let today = new Date();
		for (var i in this.props.Magazine){
			let ttItem = this.props.Magazine[i];
			let ttItem_Check = {
					addr: ttItem.addr,
					disc: ttItem.disc,
					id :ttItem.id,
					isVisit: ttItem.isVisit,
					ln  : ttItem.ln,
					lg  : ttItem.lg,
					name : ttItem.name,
					payForms : ttItem.payForms,
					pic : ttItem.pic,
					reject : ttItem.reject,
					ttid : ttItem.ttid,
					visit : ttItem.visit
			};



			if (this.props.visitInfo && this.props.visitInfo[ttItem.id]){
				ttItem_Check.isVisit = 1;
				ttItem_Check.reject = this.props.visitInfo[ttItem.id].arr[this.props.visitInfo[ttItem.id].arr.length-1].comment;
			
			}
			let VISIT =  new Date(ttItem.visit);
			ttItem_Check.today =  today.getDate() === VISIT.getDate() 
					&& today.getMonth() === VISIT.getMonth()
					&& today.getYear()  === VISIT.getYear();
			
			if (ttItem_Check.isVisit===1 ){
				if(ttItem_Check.reject && ttItem_Check.reject!=="-"){

					ttItem_Check.class =  'material-icons Reject';
					ttItem_Check.content = 'clear' ;
				}
				else {
					ttItem_Check.class =  'material-icons Complite' ;
					ttItem_Check.content  = 'done';
				}
			}
			else if (ttItem_Check.today){
				ttItem_Check.class =  'Today';
				ttItem_Check.content = '' ;
			}
			else {
				ttItem_Check.class =  'Feature';
				ttItem_Check.content = '' ;
			}
			TTList.push(ttItem_Check);

		}

		 new Sorter(TTList, less);
		this.setState({TTList:TTList,FiltList:TTList});
	}

	



	componentWillUnmount(){
		this.props.actions.stop_gpsTracker();
	}





	filter (name){
		if( name && this.state.filt &&  
					name === this.state.filt.substring(0, this.state.filt.length-1)){
			this.setState({
	  				filt:name,
	  				FiltList:filterData(this.state.FiltList,name,this.state.selectedDay)
	  			});
		}
		else{
			this.setState({
	  				filt:name,
	  				FiltList:filterData(this.state.TTList,name,this.state.selectedDay)
	  			});
		}
	  	
	  	
	}




	

	handleChange  (item, value)  {
    //this.setState({...this.state, [item]: value});
  };


}





function filterData (list, textFilter, dateFilter){
	if(!list){
		return list;
	}
	let filterdList  = [];
	//only by name-addr
	if(textFilter && !dateFilter){
		list.map((data)=>{
			new RegExp(textFilter,"i").test(JSON.stringify(data)) ? filterdList.push(data) : "";
		});
		return filterdList;
	}
	//only by visit date

	else if(!textFilter && dateFilter){
		list.map((data)=>{

			DateAreTheSame(dateFilter, new Date(data.visit)) ? filterdList.push(data) : "";
		});
		return filterdList;
	}
	//by name, addr and visit date 
	else if (textFilter && dateFilter){
		list.map((data)=>{
			if(DateAreTheSame(dateFilter, new Date(data.visit)) 
					&& new RegExp(textFilter,"i").test(JSON.stringify(data))){
				filterdList.push(data)
			}
		});
		return filterdList;
	}
	// non filters specified
	else {
		return list;
	}

}


function DateAreTheSame (oneday, another){
	if(!oneday || !another ){
		return true;
	}
	return oneday.getDate() === another.getDate()
				&& oneday.getYear() === another.getYear()
				&& oneday.getMonth() === another.getMonth()
}



import actions from "../redux/actions"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);










