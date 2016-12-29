import React, {Component, PropTypes} from 'react';
import './routeFilter.css';
import Dialog from 'react-toolbox/lib/dialog';
import CalendarDialog from '../../dialogs/CalendarDialog'




export default class RouteFilter extends Component{
	constructor(props){
		super(props);
		this.state  = {
			active:false
		}
		this.tongleDialog = this.tongleDialog.bind(this);
		this.dateFilter = this.dateFilter.bind(this);
	}

	dateFilter(date){
		this.setState({active: false});
		this.props.dateFilter(date);
	}

	tongleDialog(){
		this.setState({active: !this.state.active});
	}

	render(){
		return (
			<div className = "routeFilter">
				<input 
					value = {this.props.value}
					type="text" 
					placeholder="фильтр" 
					onChange = {this.props.textFilter}/>
				<span 
					className = {this.props.dateVal ? "material-icons selected" : "material-icons"} 
					onClick = {this.tongleDialog}
					>date_range
				</span>

				<Dialog 
					className = {"DateDialogPicker"}
					active={this.state.active}
					onEscKeyDown={this.tongleDialog}
					onOverlayClick={this.tongleDialog}
				>
					<CalendarDialog
						dateFilter = {this.dateFilter}
						dateVal = {this.props.dateVal}
					/>
				</Dialog>
			</div>
		)
	}
		
}

RouteFilter.propTypes= {
	textFilter: PropTypes.func.isRequired,
	dateFilter: PropTypes.func.isRequired,
	value : PropTypes.string.isRequired,
	//dateVal: PropTypes.any.isRequired,
}









