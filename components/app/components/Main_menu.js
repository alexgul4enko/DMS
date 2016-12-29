import React, { Component } from 'react'
import './style/menu.css'
import { browserHistory } from 'react-router'


class Main_menu extends Component {
	constructor(){
		super();
		this.goBack = this.goBack.bind(this);
		this.sync = this.sync.bind(this);
		this.full_screean = this.full_screean.bind(this);
	}

	render(){
		return ( 
			 <div id = "main_menu">
			 	<img src="./files/left-arrow-angle.svg"
			 		 className = "go_back"
			 		 onClick={this.goBack}/>
			 	<div className = "fs">
			 		<img src="./files/sync-symbol.svg" className= "sync"
			 			 onClick={this.sync}/>
			 		<img src="./files/full-screen.svg"
			 			 onClick={this.full_screean}/>
			 	</div>
			 </div>
		)
	}
	goBack(){
		if(this.props.prevStage.length === 1 ){
			 window.location = "/Preload"

		}
		else{
			this.props.goBack();
			//browserHistory.push(this.props.prevStage);
		}
	}

	sync(){
		browserHistory.push("LoadData");
	}
	full_screean(){
		this.props.fullScrean();
	}


}

export default Main_menu;