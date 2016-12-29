import React, {Component} from 'react'


export default class RoutesContent extends Component{
	constructor(props){
		super(props);
		this.log = this.log.bind(this);
	}
	log(){
		
		this.props.getTest();
	}
	render(){
		
		return (
				<div onClick={this.log}>
				<div>Hello its Routes SD sdfs !!</div>
				</div>
			)
	}
		
}
