import React, { Component } from 'react'
import Main_menu from './Main_menu'
import Galery_Photo from './Galery_Photo'
import Dialog from 'react-toolbox/lib/dialog';
import ImageDrop from './Actions/ImageDrop'
import ImageDropPromt from './Actions/ImageDropPromt'

class Gallery extends Component {
	constructor(props){
		super(props);

		this.state = {
			images: null
		}

		this.handleResize = this.handleResize.bind(this);
		this.handleOnImgClick =this.handleOnImgClick.bind(this);
		this.handleDialogclose = this.handleDialogclose.bind(this);
		this.dropImageFromDB = this.dropImageFromDB.bind(this);
		this.switchDialog = this.switchDialog.bind(this);

		this.dbConnect = this.dbConnect.bind(this);
		this.getImageByKey = this.getImageByKey.bind(this);
	}


	handleOnImgClick(img_id, img_url){
		this.props.actions.selectGaleryImage(true,img_url,img_id);
	}

	switchDialog(){
		this.props.actions.switchGalleryDialog();
	}

	handleResize(){
		let calcsoze = window.getComputedStyle(document.getElementById('gallery'));
		this.props.actions.setImageGaleryWidth(parseInt(calcsoze.width));
	}

	dropImageFromDB(){
		this.props.actions.deleteImage(this.props.gallery.img_id,
					this.props.TTAnswers[this.props.flow.action.key],
					this.props.flow.action);
	}

	handleDialogclose(){
		this.props.actions.closeGalleryDialog();
	}


	componentWillUnmount() {
		window.removeEventListener('resize',this.handleResize);
		this.props.actions.galleryOut();
	}

	componentDidMount() {
		// add window resize listener
		window.addEventListener('resize', this.handleResize);
		let calcsoze = window.getComputedStyle(document.getElementById('gallery'));
		this.props.actions.setImageGaleryWidth(parseInt(calcsoze.width));

		

		let act = this.props.flow && this.props.flow.action 
		let act_key = act.key;
		let images  = (act.type == 1 )
							? this.props.TTAnswers[act_key].ans
							: this.props.ProductAnswers[act_key].ans;

		if(images && images.length){
			images.reverse();
			let tempImageArr = [];
			const length = images.length;
			this.dbConnect()
				.then(objectStore=>{
					images.map((key,id)=>{
						let lastElem = length-1 == id;
						return this.getImageByKey(objectStore,key,tempImageArr, lastElem);

					})
				})
				.catch(error=>{
					console.log(error);
				})
		}
		

	}

	getImageByKey(objectStore,key,tempImageArr,islast){
		return new Promise((resolve,reject)=>{
			let transactiondata = objectStore.get(key);
			transactiondata.onsuccess = (evt)=>{
				tempImageArr.push({
					key,
					src: event.target.result.imm
				});
				if(islast){
					this.props.actions.addImageGallery(tempImageArr);
				}
			}
			transactiondata.onerror = (err)=>{
				console.log(err);
				if(islast){
					this.props.actions.addImageGallery(tempImageArr);
				}
			}
		});
	}

	dbConnect(){
		return new Promise((resolve,reject)=>{
			const DB_NAME = 'DMSMobile';
			const DB_VERSION = 1;
			const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
			let openDB = indexedDB.open(DB_NAME, DB_VERSION);
			openDB.onsuccess = (evt)=>{
				resolve(evt.currentTarget.result.transaction("Images").objectStore("Images")) ;
			}
			openDB.onerror = (err)=>{
				console.log(err);
				reject("Can't open DB((");
			}
		});
	}




	render(){
		return ( 

			 <div className = "app">
			 	<Main_menu 
						goBack = {this.props.actions.goBack}
						fullScrean = {this.props.actions.fullScrean}
						prevStage = {this.props.flow.backStage}
						/>
				<div className="Content" id="gallery">
					{this.props.gallery.images? this.props.gallery.images.map((data)=>{
							return <Galery_Photo 
											handler = {this.handleOnImgClick}
											width = {this.props.gallery.width/2}
											src = {data.src} 
											id =  {data.key}
											key = {data.key}/>
						})
						:''
					}
				<Dialog
			          active={this.props.gallery.active}
			          onEscKeyDown={this.handleDialogclose}
			          onOverlayClick={this.handleDialogclose}
			          
		        	>

		        	{
		        		this.props.gallery.promt ? 
		        			<ImageDrop
			        			img_url = {this.props.gallery.img_url}
			        			close = {this.handleDialogclose}
				          		switchDialog  = {this.switchDialog}
			          		/>
			          		:
			          		<ImageDropPromt
			          			img_url = {this.props.gallery.img_url}
			        			close = {this.handleDialogclose}
				          		dropImageFromDB  = {this.dropImageFromDB}
			          		/>
		        	}
		        	
		        </Dialog>
			
				</div>


			 </div>
		)
	}


}

export default Gallery;