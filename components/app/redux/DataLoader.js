import GetData from './GetData'
const ListToLoad = [
			{url:"/api/actions",name:"Справочник заданий"},
			{url:"/api/history",name:"История заказов"},
			{url:"/api/magazine",name:"Справочник ТТ"},
			{url:"/api/payforms",name:"Справочник форм оплаты"},
			{url:"/api/products",name:"Справочник продуктов"},
			{url:"/api/ttPriceList",name:"Спец. прайслист"},
			{url:"/api/ttProducts",name:"Справочник продуктов по ТТ"},
			{url:"/api/priceList",name:"Прайслист"},
			{url:"/api/ttActions",name:"Задания по маршруту"}
		
];




var DataLoader = function (dispatch, actions){
  let loader =  function(){
  	ListToLoad.map((data)=>{
  			GetData(dispatch,data.url,data.name, actions);
  	})
  }

 

  return loader;
}




 module.exports = DataLoader;