import constance from '../Constances'
import DropImage from '../dbactions/DropImage'
import DBConnect from '../dbactions/DBConnect'
import OpenTransaction from '../dbactions/OpenTransaction'
import ImagesDB from '../dbactions/ImagesDB'
import AnswersDB from '../dbactions/AnswersDB'


const galeryImageActions = {
	deleteImage : function (imm_id,prevAns,action){
		return (dispatch,getState) =>{
			//connect to IndexedDB
			let db ;
			DBConnect()
				.then(result =>{
					//open Transaction for Images database
					db = result;
					return OpenTransaction(result, "Images");
				})
				.then(objectStore=>{
					//drop image
					return ImagesDB(objectStore).dropImage(imm_id);
				})
				.then(dropImm=>{
					//open Transaction for answers database
					const transactionDB = action.type == 1 ? "TTAnswers" : "ProductAnswers";
					return OpenTransaction(db, transactionDB);
				})
				.then(objectStore=>{
					const AnswerDBDispatcher = AnswersDB(objectStore);
					if (prevAns.ans.length ==1){
						return AnswerDBDispatcher.dropAnswer(prevAns.id);
					}
					else {
						const newArr = prevAns.ans.filter((data)=>{
							return data != imm_id;
						});
						const newAns = Object.assign({},prevAns, {ans:newArr, date: new Date()})
						return AnswerDBDispatcher.updateAnswer(newAns);
					}
				})
				.then(newAns=>{
					if (!newAns){
						if (action.type == 1){
							dispatch(galeryImageActions.dropTTImageAnswer(prevAns.id));
						}
						else{
							///
						}
					}
					else{
						if (action.type == 1){
							dispatch(galeryImageActions.updateTTImageAnswer(newAns));
						}
						else{
							///
						}
					}

					dispatch(galeryImageActions.closeGalleryDialog());
					dispatch(galeryImageActions.removeGalleryImage(imm_id));
				})
				.catch(
					(error) =>{
						console.log(error);

					}
				)
		}
	},

	updateTTImageAnswer:function(newAnswer){
		return {
			type:constance.UPD_TT_IMAGE_ANS,
			newAnswer
		}
	},
	dropTTImageAnswer:function(answerID){
		return {
			type:constance.DROP_TT_IMAGE_ANS,
			answerID
		}
	},

	selectGaleryImage:function(active,img_url,img_id){
		return {
			type:constance.SELECT_GALERY_IMAGE,
			active,
			img_url,
			img_id
		}
	},
	switchGalleryDialog:function(){
		return{
			type:constance.SWITCH_GALLERY_DIALOG
		}
	},
	closeGalleryDialog:function (){
		return{
			type: constance.CLOSE_GALLERY_DIALOG
		}
	},
	galleryOut:function(){
		return{
			type: constance.GALLERY_OUT
		}
	},
	setImageGaleryWidth : function (width){
		return {
			type: constance.SET_GALERY_WINDTH,
			width
		}
	},
	addImageGallery: function (images){
		return {
			type: constance.ADD_IMAGE_GALLERY,
			images
		}
	},
	removeGalleryImage: function(key){
		return {
			type: constance.REMOVE_GALLERY_IMAGE,
			key
		}
	}
} 

export default galeryImageActions;
