import Constances from './Constances';


export default function loaderReducer (state = {}, action){
	switch(action.type){
		case Constances.START_LOAD:
			return Object.assign({},state,
						{lab:["Начало загрузки", "Выборка данных фотографий"]}
			);
		case Constances.IMAGE_SELECT:
			return Object.assign({},state,{images:action.rehidrate,loadetIM : 0});
		case Constances.MINUS_IMAGE:
			return Object.assign({},state,{loadetIM:++state.loadetIM});
		case Constances.ADDSTOCKSTITLE:
			return Object.assign({},state,{
				ttl: [...(state.ttl||[]) , {label :"Загрузка данных остатков", isload:false}]
			})
		case Constances.ADDACTIONSTITLE:
			return Object.assign({},state,{
				ttl: [...(state.ttl||[]) , {label :"Загрузка заданий по ТТ", isload:false}]
			})
		case Constances.STOCKS_LOADET:
			return Object.assign({},state,{
					ttl: state.ttl.map(u=>{
						if(u.label = "Загрузка данных остатков"){
							return {label :"Загрузка данных остатков", isload:true}
						}
						else{
							return u;
						}
					})
				})

		case Constances.ANSWERS_LOADET:
			return Object.assign({},state,{
					ttl: state.ttl.map(u=>{
						if(u.label = "Загрузка заданий по ТТ"){
							return {label :"Загрузка заданий по ТТ", isload:true}
						}
						else{
							return u;
						}
					})
				})
		case Constances.CLEAR_LOADING:
			return {};
		case Constances.DONEJOB:
			return Object.assign({},state,{done:true});
		default:
			return state;
	}
}