import React, { Component } from 'react'
import './load.css'


class LoadInfo extends Component {
	constructor(){
		super();
	}

	render(){
		return ( 
			this.props.data.succes? 
			 <div className="loadersINfo ok">
			 		<span>&#10004;</span>
					{this.props.data.name}
			 </div> :
			 <div className="loadersINfo notok">
			 		<span>&#10008;</span>
					{this.props.data.name}
			 </div> 
		)
	}

}

export default LoadInfo;