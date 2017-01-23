import Constances from './Constances';


export function imageReducer  (state = [], action){
	switch (action.type){
		case Constances.INIT_PHOTOS_LIST:
			return action.rehidrate;
		case Constances.PUT_NEW_IMAGE:
			return [action.rehidrate , ...state];
		case Constances.CLEAR_IMAGES_LIST_BEFORE:
			return [];
		default :
			return state;
	}
}


export function productImagesReducer (state = [], action){
	switch(action.type){
		case Constances.INIT_PRODUCT_PHOTOANSWERS: 	
			return action.rehidrate;
		case Constances.ADD_PRODUCT_PHOTOANSWERS:
			return [action.rehidrate, ...state];
		default:
			return state;
	}
}


export function ImageTTActionReducer (state = {}, action){
	switch (action.type){
		case Constances.CHANGE_IMAGE_ANSWER:
			return Object.assign({},state,
					{[action.rehidrate.id]:action.rehidrate})
		default :
			return state;
	}
}




