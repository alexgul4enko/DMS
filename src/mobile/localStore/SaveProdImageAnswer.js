import getProductAnswer from './getProductAnswer';
import PutData from './PutData';


export default function SaveProdImageAnswer (answer){
	return new Promise ((resolve,reject)=>{
		const {id,key, prodID,ans} = answer;
		getProductAnswer(id)
			.then(LocalAnswer=>{
				const prodAns = LocalAnswer[prodID];
				const newAns = {...prodAns, [key]:{answer:ans}}
				const obj = {...LocalAnswer,[prodID]:{...newAns} }
				return PutData("ProductAnswers",{id:id,obj})
			})
			.then(data=>{
				resolve(answer)
			})
			.catch(err=>{
				reject(err||err.message)
			})
	})
}


