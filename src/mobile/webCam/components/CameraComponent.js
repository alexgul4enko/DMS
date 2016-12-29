import React, {Component, Proptypes}  from 'react';
import Menu from '../../Menu/Menu.js'
import Webcam from './Webcam';
import {Button} from 'react-toolbox/lib/button';
import { browserHistory } from 'react-router';

export default class  CameraComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			ref : props.Images ? props.Images[0] &&  props.Images[0].data || null : null  ,
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
			const answer = this.props.PhotoAnswer ? this.props.PhotoAnswer 
						: {
							id:this.props.CurAction.key,
							ans:null,
						};
			const info = {
				ln:this.props.GPS.ln,
				lg:this.props.GPS.lg,
				date :new Date(),

			}
			this.props.PutData({data:screenshot},answer,info,this.props.CurAction.mult );
		}
	}
	handleResize(){
		let calsoze = window.getComputedStyle(document.getElementById('app_cont'));
		this.setState({width: parseInt(calsoze.width),
						height: parseInt(calsoze.height)
				   });
	}

	toGalery(){
		 browserHistory.push({pathname:'Gallery',state:{...this.props.location.state}});
	}


	render (){
		const classBut = (this.state.width < this.state.height) ?  "vertical":  "horizontal";
		return (
			<div className = "rootComponentContainer">
				<Menu/>
				<div id="app_cont" className = "CameraContent">
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
						{this.state.ref? 
							<img 
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

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	}

	componentWillMount() {
		this.props.initGpsLocations();
		
	}
	componentWillUnmount() {
		window.removeEventListener('resize',this.handleResize);
	}
}
 

