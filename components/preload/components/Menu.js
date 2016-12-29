import  React, { Component } from 'react';
import './menu.css'

class Menu extends Component{
	constructor() {
		super();
	}

	render(){
		return(
			<div id="menu">
					{this.props.children}
        	</div>
		)
	}
}


export default Menu;