import  Constances from './Constances'
import { browserHistory } from 'react-router'

export default function preload(state = {}, action) {
	switch (action.type) {
		case Constances.INIT_STORE:
			return [
				{url:"/api/Actions", name: "Справочник заданий", isFinished:false,err:""},
				{url:"/api/Magazine", name: "Справочник ТТ", isFinished:false,err:""},
				{url:"/api/PayForms", name: "Справочник форм оплаты", isFinished:false,err:""},
				{url:"/api/Products", name: "Справочник продуктов", isFinished:false,err:""},
				{url:"/api/TTPriceList", name: "Справочник 'Спец. прайслист'", isFinished:false,err:""},
				{url:"/api/TTProducts", name: "Справочник 'Спец. продукты'", isFinished:false,err:""},
				{url:"/api/PriceList", name: "Прайслист", isFinished:false,err:""},
				{url:"/api/TTActions", name: "Справочник заданий по маршрутам", isFinished:false,err:""},
				{url:"/api/TTDiscounts", name: "Справочник условий продаж", isFinished:false,err:""},
				{url:"/api/TTPayForms", name: "Справочник условий работы", isFinished:false,err:""},
				{url:"/api/Routes", name: "Спарвочник марштутов", isFinished:false,err:""},
				{url:"/api/Warehouse", name: "Остатки", isFinished:false,err:""}
			]

		case Constances.LOAD_DATA_FINISHED:
			return state.map(data=>{
				const {url} = data;
				if(url==action.url){
					return Object.assign({},data,{isFinished:true,err:action.err});
				}
				return Object.assign({},data);
			});
		case Constances.RELOAD_DATA:
			return state.map(data=>{
				const {url} = data;
				if(url==action.url){
					return Object.assign({},data,{isFinished:false,err:null});
				}
				return Object.assign({},data);
			});
		case Constances.CLEAR_STAGE:
			return [];

		default:
			return state;
  }
}
