import React, { Component } from 'react'
import './load.css'


class LoadButon extends Component {
	constructor(){
		super();
		this.GoON = this.GoON.bind(this);
	}

	render(){
		return ( 
			 <div className="LoadButon" onClick={this.GoON}>
			 	{this.props.data}    
			 </div>
		)
	}
	GoON(){
		this.props.actions.donotSync();
	}

}

export default LoadButon;