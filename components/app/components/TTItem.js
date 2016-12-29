
import React, { Component } from 'react'
import {Link} from 'react-router'
var format = require('date-format');
import './style/TTItem.css'

import { browserHistory } from 'react-router'

class TTItem extends Component {
	constructor(){
		super();
		this.setSelectedTT = this.setSelectedTT.bind(this);
	}

	render(){
		let toDay = new Date();
		return ( 
			
			<div className = "TTItem" onClick={this.setSelectedTT}>
				<div className = {this.props.data.class}>
					{this.props.data.content}
				</div>
				<div className = "TTInfo">
					<div>{format('dd-MM-yyyy', new Date(this.props.data.visit))}  </div> 
					<div>{this.props.data.name } </div> 
					<div>{this.props.data.addr } </div> 
                </div>

			</div>
		)
	}
	
	setSelectedTT(){
	    this.props.selectTT(this.props.data.id);
	    browserHistory.push('Actions');
	}
}

export default TTItem;