
import React, { Component } from 'react'
import {Tab, Tabs} from 'react-toolbox';
import './style/map_list.css'
import MapPage from './map/Map'
import TTItem from './TTItem'
import GPS from './map/GPS_LO';


class Map_List extends Component {
	constructor(){
		super();
		this.state = {
		    index: 1,
		    fixedIndex: 1,
		    inverseIndex: 1,
		    GPS:false
		  };

		this.handleTabChange = this.handleTabChange.bind(this);
		this.handleActive = this.handleActive.bind(this);
		this.tongleGPS = this.tongleGPS.bind(this);
	}

	tongleGPS (){
		this.setState({GPS: !this.state.GPS});
	}

	render(){

		return ( 
			 <Tabs index={this.state.index} onChange={this.handleTabChange}>
		          <Tab label='Список' >
		          	<div className = "TTList">
		             {
		             	Object.keys(this.props.TT).map((i)=>{
		             		return <TTItem key ={i}
		             					   selectTT = {this.props.selectTT}
		             					   data=	{this.props.TT[i]}>
		             					   

		             				</TTItem>
		             	})


		             }
		             </div>
		          </Tab>
		          <Tab label='Карта' onActive={this.handleActive}>
		          	<MapPage 
		          		center={[this.props.flow.ln, this.props.flow.lg]}
		          		data = {this.props.TT}
		          		ln = {this.props.flow.ln}
		          		lg = {this.props.flow.lg}
		          		IS_GGPS = {this.state.GPS}
		          		selectTT = {this.props.selectTT}
		          	>
		          	</MapPage>
		          	<GPS tongleGPS={this.tongleGPS}  GPS={this.state.GPS}/>
		          </Tab>
	        </Tabs>
		)
	}
	handleTabChange(index){
		this.setState({index});
	}
	handleActive(){
		console.log('Special one activated');
	}

	filter(){

	}


}

export default Map_List;