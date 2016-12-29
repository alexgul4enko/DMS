import React, {Component, PropTypes} from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./Calendar.css";

export default class CalendarDialog extends Component{

	constructor(props){
		super(props);
		this.dateFilter = this.dateFilter.bind(this);
		this.clearDayFilter = this.clearDayFilter.bind(this);
	}

	render(){
		return (
				<div >
					<DayPicker 
		        		initialMonth={ this.props.dateVal ? new  Date(this.props.dateVal) :  new Date() }
		        		selectedDays={ day => DateUtils.isSameDay(this.props.dateVal, day) }
		        		onDayClick={ this.dateFilter}
		        		enableOutsideDays
		        		disabledDays={ DateUtils.isPastDay }
		        	/>
		        	<div 
		        		className = "ClearDay"
		        		onClick = {this.clearDayFilter}>
		        		Очистить
		        	</div>
				</div>
		)
	}

	dateFilter(e, day, { selected, disabled }){
		this.setState({active: false});
	    if (disabled) {
	      return;
	    }
	    if (selected) {
	      this.props.dateFilter(null);
	    } 
	    else {
	    	if(day){
	    		this.props.dateFilter(day);
	    	}
	    }
	}

	clearDayFilter(){
		this.props.dateFilter(null);
	}


}



CalendarDialog.propTypes= {
	dateFilter: PropTypes.func.isRequired,
	//dateVal: PropTypes.any.isRequired,
}

