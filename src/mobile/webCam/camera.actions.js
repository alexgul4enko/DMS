import Constances from './Constances';
import  rootConst from '../Constances';
import getImages from '../localStore/getImages';
import PutData from '../localStore/PutData';
import PutImage from '../localStore/PutImage';

const CameraActions = {
	initTTContent: function (ans = {}){
		return (dispatch, getState)=>{
			if(ans && ans.ans){
				getImages(ans.ans)
					.then(images=>{
						dispatch(initImagesAction(images));
						dispatch(rehidrate());
					})
					.catch(err=>{
						dispatch(initImagesAction(null));
						dispatch(rehidrate());
					})
			}
			else{
				dispatch(rehidrate());
			}
				
		}
	},

	saveImage:function (imm,prevAns,info,isMult){
		return (dispatch, getState)=>{
			if(isMult || !prevAns.ans ){
				let imageInsID ;
				PutImage("Images",imm)
					.then(id=>{
						imageInsID = id;
						const imageData = {...info , imgID:id};
						const nextAns = prevAns.ans ? 
									Object.assign({},prevAns,{ans:[imageData, ...prevAns.ans]}):
									Object.assign({},prevAns,{ans:[imageData]})
						return PutData("TTanswers",nextAns);
					})
					.then(data =>{
						dispatch(changeActoinAnswer(data));
						dispatch(putNewImageToStore({...imm,id:imageInsID}));
					})
					.catch(err=>{
						console.log(err);
					})
			}
			else{
				const imageData_ = {...imm , id:prevAns.ans[0].imgID};
				PutData("Images",imageData_)
					.then(()=>{
						const imageData = {...info , imgID:prevAns.ans[0].imgID};
						const nextAns = Object.assign({},prevAns,{ans:[imageData]})
						return PutData("TTanswers",nextAns);
					})
					.then(data =>{
						dispatch(changeActoinAnswer(data));
						dispatch(initImagesAction(imageData_));
					})
					.catch(err=>{
						console.log(err);
					})

			}
			
		}
	}
}



const putNewImageToStore = rehidrate =>{
	return{
		type:Constances.PUT_NEW_IMAGE,
		rehidrate
	}
}

const changeActoinAnswer = rehidrate =>{
	return{
		type:Constances.CHANGE_IMAGE_ANSWER,
		rehidrate
	}
}


const initImagesAction = rehidrate=>{
	return {
		type:Constances.INIT_PHOTOS_LIST,
		rehidrate,
	}
}



const rehidrate = ()=>{
	return {
		type:rootConst.REHIDRATE_STATE,
	}
};




export default CameraActions;