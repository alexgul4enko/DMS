import Constances from './Constances';
import DeleteByKey from '../localStore/DeleteByKey';
import PutData from '../localStore/PutData';


export default {
	deleteImage:function(imageID, nextAns){
		return (dispatch, getState)=>{

			DeleteByKey("Images",imageID)
				.then(()=>{
					if(nextAns && nextAns.ans && nextAns.ans.length){
						return PutData("TTanswers", nextAns);
						console.log("PutData");
					}
					else{
						return DeleteByKey( "TTanswers",nextAns.id);
						console.log("DeleteByKey");
					}
				})
				.then(()=>{
					dispatch(deleteImage(imageID));
					if(nextAns && nextAns.ans && nextAns.ans.length){
						dispatch(updateAnswer(nextAns));
					}
					else{
						dispatch(deleteAnswer(nextAns.id));
					}
				})
				.catch(err=>{
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