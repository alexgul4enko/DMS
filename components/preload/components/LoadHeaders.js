import React, { Component } from 'react'
import './load.css'


class LoadHeaders extends Component {
	constructor(){
		super();
	}

	render(){
		return ( 
			 <div className="loadersHeader">
			 	{this.props.data.header}
			 </div>
		)
	}

}

export default LoadHeaders;