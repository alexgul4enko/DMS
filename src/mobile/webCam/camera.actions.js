import Constances from './Constances';
import  rootConst from '../Constances';
import getImages from '../localStore/getImages';
import PutData from '../localStore/PutData';
import PutImage from '../localStore/PutImage';
import SaveProdImageAnswer from '../localStore/SaveProdImageAnswer';
import getProductAnswer from '../localStore/getProductAnswer';

const CameraActions = {
	initTTContent: function (ans = {}){
		return (dispatch, getState)=>{
			if(ans && ans.ans){
				getImages(ans.ans  )
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

	AddProdPhoto:(prodData={})=>{
		return (dispatch, getState)=>{
			const {mult, answer,screenshot,key,prodId,id,ActionData} = prodData;
			let ImageID;
			let newanswer;
			if(!(answer && answer.length) ){
				PutImage("Images",{data: screenshot})
					.then(imgageId=>{
						ImageID = imgageId;
						return getProductAnswer(key);
					})
					.then(prodActions=>{
					    newanswer = [{...ActionData, imgID:ImageID}]
						let clonedData = {...prodActions};
						if (!clonedData[prodId]){
							clonedData[prodId] = {[id]:{answer:newanswer}}
						}
						else{
							clonedData[prodId][id] = {answer:newanswer};
						}
						return PutData("ProductAnswers", {id:key, obj:clonedData})
					})
					.then(()=>{
						dispatch(putNewImageToStore({data:screenshot, id:ImageID}));
						dispatch(addOneNeeProdImage(newanswer));
					})
					.catch(err=>{
						console.log(err);
					})
			}
			else if (mult){
				PutImage("Images",{data: screenshot})
					.then(imgageId=>{
						ImageID = imgageId;
						return getProductAnswer(key);
					})
					.then(prodActions=>{
						newanswer = {...ActionData, imgID:ImageID};
						let clonedData = {...prodActions};
						if (!clonedData[prodId]){
							clonedData[prodId] = {[id]:{answer:[newanswer]}}
						}
						else if(!clonedData[prodId][id]){
							clonedData[prodId][id] = {answer:[newanswer]};
						}
						else{
							clonedData[prodId][id].answer = [newanswer,
							...(clonedData[prodId][id].answer||[]) ]
						}
						return PutData("ProductAnswers", {id:key, obj:clonedData})
					})
					.then(()=>{
						dispatch(putNewImageToStore({data:screenshot, id:ImageID}));
						dispatch(addOneNeeProdImage(newanswer));
					})
					.catch(err=>{
						console.log(err);
					})
			}
			else {
				ImageID = (answer && answer[0] && answer[0][0] && answer[0][0].imgID )||
				(answer && answer[0] && answer[0].imgID)  ;
			
				PutData("Images",{data: screenshot, id:ImageID})
					.then(()=>{
						return getProductAnswer(key);
					})
					.then(prodActions=>{
					    newanswer = [{...ActionData, imgID:ImageID}]
						let clonedData = {...prodActions};
						if (!clonedData[prodId]){
							clonedData[prodId] = {[id]:{answer:newanswer}}
						}
						else{
							clonedData[prodId][id] = {answer:newanswer};
						}
						return PutData("ProductAnswers", {id:key, obj:clonedData})
					})
					.then(()=>{
						dispatch(initImagesAction([{data:screenshot, id:ImageID}]));
						dispatch(initProdImageAnswer(newanswer));
					})
					.catch(err=>{
						console.log(err);
					})


			}
		}
	},

	initProductActions:(action={})=>{
		return (dispatch, getState)=>{
			const {key,prodId,id} = action;
			getProductAnswer(key)
			.then(ans=>{
				const answers_ = ans && ans[prodId] && ans[prodId][id] && ans[prodId][id].answer;
				if (answers_ && Array.isArray(answers_)){
					getImages(answers_)
						.then(images=>{
							dispatch(initImagesAction(images));
							dispatch(initProdImageAnswer(answers_));
							dispatch(rehidrate());
						})
						.catch(err=>{
							dispatch(initImagesAction(null));
							dispatch(initProdImageAnswer([]));
							dispatch(rehidrate());
						})
				}
				else {
					dispatch(rehidrate());
					dispatch(initProdImageAnswer([]));
				}
			})
			.catch(err=>{
				console.log(err);
				dispatch(rehidrate());
				dispatch(initProdImageAnswer([]));
			})
			
		}
	},



	saveImage:function (imm,prevAns = {},info,isMult,prodID,id___){
		return (dispatch, getState)=>{

			if(isMult || !prevAns.ans ){
				let imageInsID ;
				PutImage("Images",imm)

					.then(IMMid=>{
						imageInsID = IMMid;
						const imageData = {...info , imgID:IMMid};
						const {id,ans } =  prevAns || {};
						const nextAns = [imageData, ...(ans||[])]
							return PutData("TTanswers",{id, ans: nextAns});
							// return SaveProdImageAnswer({...nextAns,prodID,key:id___});
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
						const ans = [{...info , imgID:prevAns.ans[0].imgID}];
							return PutData("TTanswers",{...prevAns, ans});
							
					
						
					})
					.then(data =>{
						dispatch(changeActoinAnswer(data));
						dispatch(initImagesAction([imageData_]));
					})
					.catch(err=>{
						console.log(err);
					})

			}
			
		}
	}
}




const initProdImageAnswer = rehidrate =>{
	return{
		type: Constances.INIT_PRODUCT_PHOTOANSWERS,
		rehidrate,
	}
};

const addOneNeeProdImage = rehidrate =>{
	return {
		type : Constances.ADD_PRODUCT_PHOTOANSWERS,
		rehidrate
	}
};



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