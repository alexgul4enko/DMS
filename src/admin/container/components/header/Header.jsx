import React, {Component, PropTypes} from 'react';
import './header.css';
import Tooltip from 'react-toolbox/lib/tooltip';
import Avatar from 'react-toolbox/lib/avatar';
import { browserHistory } from 'react-router';



export default class  Header extends Component{
	changeAvatar(){
		console.log("changeAvatar");
	}

	
	render (){
		const {FirstName,LastName} =  this.props.user ||{};
		return (
			<div className = "header">
				<button 
					className = {`material-icons ${this.props.tongle ? 'hide': 'show'}`}
					onClick = {this.props.tongleMenu}
				>
					menu
				</button>
				<img onClick = {()=>{browserHistory.push('/AdminPane')}} src="/files/big-logo-ba.png"/>
				<div className = "userData">
					{this.renderAvatar(this.props.user)}
					<span className = "FIO">{`${FirstName} ${LastName}`}</span>
					<TooltipAvatar 
						tooltip="Выйти"
						icon = 'chevron_left'
						className = "AvatarIcon"
						onClick = {this.logOut}
					/>

				</div>
			</div>
		)
	}


	logOut(){
		// console.log("asdasd");
		deleteAllCookies();
		window.location.href = "/";
	}

	renderAvatar(user ={}){
		const {FirstName,LastName, Photo} =  this.props.user ||{};
		switch(Photo){
			case '-':
				return <TooltipLeter
						title = {FirstName[0].toUpperCase() + LastName[0].toUpperCase()}
						style={{ display: 'inline-block' }} 
    					tooltip="Сменить аватар"
					/>
			default:

		}

	}
}

const TooltipAvatar = Tooltip(Avatar);
const TooltipLeter = Tooltip(props => {
	const {theme,title,floating, accent, ...rest} = props||{};
	return <div {...rest } className = "TextAvatar">{title} {props.children}</div>
})

const deleteAllCookies =() =>{
	const c = document.cookie.split("; ");
	for (let i in c) 
		document.cookie =/^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";    
}








