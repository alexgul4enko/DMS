import React, {Component, PropTypes} from 'react';
import {Tab, Tabs} from 'react-toolbox';
import MagazinesList from './MagazinesList';
import Map from './map/Map';
import { browserHistory } from 'react-router';

export default class RouteTabs extends  Component{
	constructor(props){
		super (props);
		this.state  = {
			index:0,
			GPS: false
		}
		this.handleTabChange = this.handleTabChange.bind(this);
		this.goToRoute = this.goToRoute.bind(this);
	}
	handleTabChange(index){
		this.setState({index});
	}

	goToRoute (id){
	
		if(id){
			browserHistory.push(`TT/${id}`)
		}
	}

	render(){
		return(
			<Tabs 
				className = "BiServTabs" 
				index={this.state.index} 
				onChange={this.handleTabChange}>
				<Tab label='Список' className = "routeLabel" activeClassName ="KKK">
					<MagazinesList 
						magazines = {this.props.magazines}
						toRoute = {this.goToRoute}/>
				</Tab>
				<Tab label='Карта' className = "routeLabel" activeClassName = "KKK">
					
					<Map
						center={[this.props.GPS.ln, this.props.GPS.lg]}
			          	data = {this.props.magazines}
			          	ln = {this.props.GPS.ln}
			          	lg = {this.props.GPS.lg}
			          	toRoute = {this.goToRoute}
					/>
						
				</Tab>
			</Tabs>
		)
	}
}

RouteTabs.propsTypes = {
	magazines: PropTypes.array,
}