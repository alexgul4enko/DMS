import getProductAnswer from './getProductAnswer';
import PutData from './PutData';

export default function RemoveImageFromProductAction (key, prodId, id,imgID_){
	return new Promise((resolve, reject)=>{
		getProductAnswer(key)
			.then(answer=>{
				const productActions = answer && answer[prodId];
				const actionAnswers = productActions && productActions[id] && productActions[id].answer;
				if(actionAnswers && actionAnswers.length){
					const newAnswer = actionAnswers.filter(ans=>{
						const {imgID} =  ans;
						return imgID!=imgID_;
					})
					if(newAnswer.length){
						const obj = {...answer, [prodId]:{...productActions , [id]:{answer:newAnswer}}}
						return PutData("ProductAnswers",{id:key,obj})
					}
					else{
						let withourAns =  {...productActions};
						delete withourAns[id];
						const obj = {...answer, [prodId]:{...withourAns}};
						return PutData("ProductAnswers",{id:key,obj})
					}
				}
			})
			.then(()=>{
				resolve();
			})
			.catch(err=>{
				reject (err && err.message);
			})
	})
}


