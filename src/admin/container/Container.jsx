import React, {Component} from 'react';
import Header from './components/header/Header'
import Menu from './components/menu/Menu';
import './container.css';
import WorkSpace from './components/workSpace/WorkSpace';
import Dialog from 'react-toolbox/lib/dialog';
import Dog from '../../components/dog/Dog';
import {  Snackbar } from 'react-toolbox';

export default class Container extends Component{
	constructor(props){
		super(props);
		this.state = {
			show_menu:true,
		}
		this.tongleMenu = this.tongleMenu.bind(this);
	}

	tongleMenu(){
		this.setState({show_menu : !this.state.show_menu});
	}

	render(){
		return (
			<div className = "appContainer">
				<Header 
					user = {this.props.user}
					tongleMenu = {this.tongleMenu}
					tongle = {this.state.show_menu}
				/>
				<div className = "ContentWrapper">
					<Menu 
						tongle = {this.state.show_menu}
						items = {this.props.user && this.props.user.rigths}
						location = {this.props.location}
					/>
					<WorkSpace 
						location = {this.props.location}
						tongle = {this.state.show_menu}
					>
						{this.props.children}
					</WorkSpace>
				</div>
				<Dialog
					active={this.props.loading}
					className = "admin-loading"
				>
					<Dog/>
				</Dialog>
				<Snackbar
					active={this.props.err!=''}
					label={this.props.err}
					timeout={1000}
					onTimeout={this.props.closeError}
					type='warning'
			      />
			</div>
		)
	}
}

