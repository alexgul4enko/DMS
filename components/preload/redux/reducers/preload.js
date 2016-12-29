const constance = {
	PRELOAD : "PRELOAD",
	HEADERS : "HEADERS",
	WEBDB : "WEBDB",
	CO : 1
};

import WebDb from '../WebDb'

export default function preload(data = [], action){
	switch (action.type){
		case constance.PRELOAD:
				if((data.length-1)==constance.CO){
					console.log("Load finished");
				}
				return [ ...data ,  action.value]
				break;
		case constance.HEADERS:
				return [ ...data , {header: action.value}]
				break;
		case constance.WEBDB:
			let webDB = new WebDb(data);
		
			let out = [  {header: "Обработка данных окончена"}
							, {buton: "Продолжить"}];

			return [ ...data ,  ...out];
			break;

		// case constance.ADD:
		// console.log("ADD");
		// 	return [{somedata: action.value}, ...data]
		// 		break;

		default:
		return data;
	}
}
