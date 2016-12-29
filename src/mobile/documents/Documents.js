import React , {Component} from 'react'
import Menu from '../Menu/Menu.js';
export default class Documents extends Component {
	render(){
		return (
			<div className = "rootComponentContainer">
				<Menu/>
				<div id="app_cont">
					<h1 className ="tt">В разаработке</h1>
				</div>
			</div>
		)
	}
}