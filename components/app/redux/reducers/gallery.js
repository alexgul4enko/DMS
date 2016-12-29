import constance from '../Constances'
import gallery_store from '../../stores/galleryStore'


export default function gallery (data = {}, action){
	switch (action.type){

		case constance.ADD_IMAGE_GALLERY:
			return Object.assign({},data, {images:action.images});
		case constance.REMOVE_GALLERY_IMAGE:
			let newImageArr = data.images.filter(data=>{
				return data.key != action.key
			});
			return Object.assign({},data, {images: newImageArr})

		case constance.SET_GALERY_WINDTH:
			return Object.assign({},data, {width: action.width})

		case constance.SELECT_GALERY_IMAGE:
			const {active, img_url, img_id} =action;
			return Object.assign({},data, {active, img_url, img_id})

		case constance.SWITCH_GALLERY_DIALOG:
			const {promt} = data;
			return Object.assign({},data, {promt:!promt})

		case constance.CLOSE_GALLERY_DIALOG:
			const toClose = {
				active:   false,
				img_url: null,
				img_id:  null,
				promt: true
			}
			return Object.assign({},data, toClose);
		case constance.GALLERY_OUT:
			return Object.assign({},data, gallery_store.gallery);

		default:
		return data;
	}
}

