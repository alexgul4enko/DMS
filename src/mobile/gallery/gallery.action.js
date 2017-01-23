import Constances from './Constances';
import DeleteByKey from '../localStore/DeleteByKey';
import PutData from '../localStore/PutData';
import RemoveImageFromProductAction from '../localStore/RemoveImageFromProductAction';


export default {
	deleteImage:function(imageID, nextAns){
		return (dispatch, getState)=>{

			DeleteByKey("Images",imageID)
				.then(()=>{
					if(nextAns && nextAns.ans && nextAns.ans.length){
						return PutData("TTanswers", nextAns);
					}
					else{
						return DeleteByKey( "TTanswers",nextAns.id);
					}
				})
				.then(()=>{
					dispatch(deleteImage(imageID));
					console.log(nextAns)
					if(nextAns && nextAns.ans && nextAns.ans.length){
						console.log("UPDATE")
						dispatch(updateAnswer(nextAns));
					}
					else{
						console.log("DELETE")
						dispatch(deleteAnswer(nextAns.id));
					}
				})
				.catch(err=>{
					console.log(err);
				})
		}
	},
	deleteProductImage:(imageID, action = {})=>{

		return (dispatch, getState)=>{
			const {key, prodId, id} = action;
			DeleteByKey("Images",imageID)
				.then(()=>{
					return RemoveImageFromProductAction(key, prodId, id,imageID);
				})
				.then(()=>{
					dispatch(deleteImage(imageID));
				})
				.catch(err=>{
					dispatch(deleteImage(imageID));
					console.log(err);
				})
			
				
			
		}
	}
}



const deleteImage = rehidrate=>{
	return {
		type:Constances.GALLERY_REMOVE_IMAGE,
		rehidrate,
	}
};


const updateAnswer = rehidrate=>{
	return {
		type:Constances.GALLERY_UPDATE_ANSWER,
		rehidrate,
	}
};

const deleteAnswer = rehidrate=>{
	return {
		type:Constances.GALLERY_DELETE_ANSWER,
		rehidrate,
	}
}