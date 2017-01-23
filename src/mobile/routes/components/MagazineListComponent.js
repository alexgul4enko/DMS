import React, {Component, PropTypes} from 'react';
import './MagazineListComponent.css';

export default class MagazineListComponent extends Component {

	constructor(props){
		super(props);
		this.goToRoute = this.goToRoute.bind(this);

	}

	goToRoute(){
		this.props.toRoute(this.props.id);
	}

	render(){
		const props = this.props;
		const marker = isToday(props.visitDate) ? 
								props.isVisit ?
									props.reject ?
											{cl:"marker reject", val:"highlight_off"} :
									{cl:"marker visit", val:"done"}:
							{cl:"marker today", val:""}	:
						{cl:"marker nottoday", val:""}
		return(
			<div className = "TTListElement" onClick = {this.goToRoute}>
				<div className = {marker.cl}>
					<span className="material-icons">{marker.val}</span>
				</div>
				<div className = "TT_Info">
					<span>{preatyDay(props.visitDate)}</span>
					<span>{props.name}</span>
					<span>{props.addr}</span>
				</div>
			</div>
		)
	}
		
};






function preatyDay(day=""){
	if(!day){
		return "";
	}
	let ThatDay = new Date (day);
	
	const f = `${ThatDay.getYear()+1990}-${ThatDay.getMonth()+1<10 
										? '0'+ (ThatDay.getMonth() +1)
										: ThatDay.getMonth()+1}-${
										ThatDay.getDate()<10 
										? '0'+ ThatDay.getDate() 
										: ThatDay.getDate()}`;
	return f;
}

function  isToday(day = null){
	if(!day){
		return false;
	}
	let Today = new Date();
	let Thatday = new Date(day);
	return Today.getYear() ==Thatday.getYear() 
				&& Today.getMonth() ==Thatday.getMonth()
				&& Today.getDate() ==Thatday.getDate()

}


