import React, { Component } from 'react'
import './style/image_galery.css'
export default class Galery_Photo extends Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}


	handleClick(){
		let {id, src} = this.props;
		this.props.handler(id, src);
	}

	render(){
		return (
				<img 
					onClick = {this.handleClick}
					className = "Image_Galery"
					src = {this.props.src} 
					width = {this.props.width -20 }

						/>
					
			)
	}
}