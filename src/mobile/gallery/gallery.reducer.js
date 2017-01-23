import Constances from './Constances';

export function ImagesGaleryreducer (state = [], action){
	switch(action.type){
		case Constances.GALLERY_REMOVE_IMAGE:
			return state.filter(data=>{
				if(!data) return false;
				return data.id !=action.rehidrate;
			});
		default:
			return state;
	}
}





export function TTActionGaleryreducer (state ={}, action){
	switch(action.type){
		case Constances.GALLERY_UPDATE_ANSWER:
			return Object.assign({},state,
					{[action.rehidrate.id]:action.rehidrate})
		case Constances.GALLERY_DELETE_ANSWER:
			const {[action.rehidrate] : kk , ...other} = state;
			return other;
		default:
			return state;
	}
}