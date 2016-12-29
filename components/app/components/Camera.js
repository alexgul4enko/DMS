import React, { Component } from 'react'
import Main_menu from './Main_menu'
import Webcam from 'react-webcam';
import {Button} from 'react-toolbox/lib/button';
import './style/camera.css'
import { browserHistory } from 'react-router'

class Camera extends Component {
	constructor(props){
		super(props);
		this.state = {
			ref:null,
			width: window.innerWidth,
			height: window.innerHeight
		};
		this.takePhoto = this.takePhoto.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.toGalery  = this.toGalery.bind(this);
	}





	takePhoto(){
		let screenshot = this.refs.webcam.getScreenshot();
		if (screenshot.length>50){
			this.setState({ref:screenshot}); 
			let prev_ans;
			let act = this.props.flow.action;
			if(act.type ==1){
				prev_ans = this.props.TTAnswers[act.key]
			}
			else{
				prev_ans = this.props.ProductAnswers[act.key]
			}
			this.props.actions.savePhoto(screenshot, act, prev_ans, this.props.flow.TT);
		}
	}



	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		let calsoze = window.getComputedStyle(document.getElementById('camera_cont'));
		this.setState({width: parseInt(calsoze.width),
						height: parseInt(calsoze.height)
				   });

		//get image
		const DB_NAME = 'DMSMobile';
		const DB_VERSION = 1;
		const action_fl = this.props.flow.action;
		const action_answers = action_fl.type == 1
						?  this.props.TTAnswers[action_fl.key]
						:  this.props.ProductAnswers[action_fl.key]

		const images_arr = action_answers ? action_answers.ans : null;

		const last_image = images_arr &&  images_arr.length ? images_arr.slice(-1)[0] : null;
		
		if(last_image){
			let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
			indexedDB.open(DB_NAME, DB_VERSION).onsuccess = (evt) =>{
				evt.currentTarget.result.transaction("Images")
								    	.objectStore("Images")
									    .get(last_image)
									    .onsuccess = (event) =>{
									    	this.setState({ref : event.target.result.imm});
										};

			}
		}
	}
	componentWillUnmount() {
		window.removeEventListener('resize',this.handleResize);
	}

	handleResize(){
		let calsoze = window.getComputedStyle(document.getElementById('camera_cont'));
		this.setState({width: parseInt(calsoze.width),
						height: parseInt(calsoze.height)
				   });
	}

	toGalery(){
		 browserHistory.push('Gallery');
		 this.props.actions.backstage('Camera');
	}
	

	render(){

		const classBut = (this.state.width < this.state.height) 
						 ?  "vertical"
						 :  "horizontal"

		return ( 
			 <div className = "app">
			 		<Main_menu 
						goBack = {this.props.actions.goBack}
						fullScrean = {this.props.actions.fullScrean}
						prevStage = {this.props.flow.backStage}
						/>
					<div className="Content" id="camera_cont">
						<Webcam
							ref='webcam'
							audio={false}
							width = {this.state.width }
							height = {this.state.height }
								
						/>

						 <div>
								<Button 
										className = {"takePhotoButton "   + classBut}
										icon='photo_camera' 
										floating  
										onClick = {this.takePhoto}/>
								{this.state.ref
										? <img 
												onClick = {this.toGalery}
												src = {this.state.ref} 
												className = "lastPhoto"
												height="70px"/>
										: ""}
						 </div>
						
					</div>
					
			 </div>
		)
	}


}

export default Camera;