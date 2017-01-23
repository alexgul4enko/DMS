import React, { PropTypes, Component } from 'react';
import Menu from '../../Menu/Menu';
import Galery_Photo from './Galery_Photo';
import Dialog from 'react-toolbox/lib/dialog';


export default class GalleryComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight,
			active: false,
			data:null,
		}
		this.handleResize = this.handleResize.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.dropImage = this.dropImage.bind(this)
	}

	openDialog(data){
		this.setState({active:true,data});
	}

	closeDialog(){
		this.setState({active:false, data:null});
	}

	handleResize(){
		let calsoze = window.getComputedStyle(document.getElementById('app_cont'));
		this.setState({width: parseInt(calsoze.width),
						height: parseInt(calsoze.height)
				   });
	}


	dropImage(){
		const {id, src} = this.state.data;
		const actionID = this.props.location.state.action.key;
		const prodId  =this.props.location &&
					 this.props.location.state && 
					 this.props.location.state.action && 
					 this.props.location.state.action.prodId;
		if (prodId){
			this.props.deleteProductImage(id, this.props.location.state.action);
		}
		else{
			const answer = this.props.TTAns[actionID];
			const nextAns ={
							id:answer.id, 
							ans: answer.ans.filter(data=>{
									console.log(data);
									return data &&  data.imgID !=id;
								}),
						};
			this.props.deleteImage(id, nextAns);
		}
		this.setState({active:false, data:null});

	}
	render(){
		return (
			<div className = "rootComponentContainer">
				<Menu/>
				<div id="app_cont" className = "Gallery_">

					{this.props.Images? this.props.Images.map((data,key)=>{
							return data?  <Galery_Photo 
											handler = {this.openDialog}
											width = {this.state.width/2}
											src = {data.data} 
											id =  {data.id}
											key = {key}/>
											:null
						})
						:''
					}
					<Dialog
						className = "ActionsDialog_ Gallery_Dialo"
						active={this.state.active}
						onEscKeyDown={this.closeDialog}
						onOverlayClick={this.closeDialog}
					>
						<h1>Удалить фото?</h1>
						<img 
							src={this.state.data && this.state.data.src}
							className = "ImageToDrop"
						/>
					
						<div className = "dialog_actions">
							<div 
								className = "dialog_bitton red material-icons"
								onClick = {this.closeDialog}>
									{'cancel'}
							</div>
							<div 
								className = "dialog_bitton green material-icons"
								onClick = {this.dropImage}>
									{'check'}
							</div>
			
						</div>
					</Dialog>
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