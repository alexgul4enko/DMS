import {combineReducers}  from 'redux';
import { routerReducer } from 'react-router-redux';
import isLocalData from './preload/preload.reducer'
import loadData from './LoadData/LoadData.reducer';
import joinReducers from './joinReducers';
import  fullScreanMode from './Menu/Menu.reducer';
import Constances from './Constances';
import {magazinesReducer,routesReducer } from './routes/routes.reducer';
import {TTAnswersReducer,
        UserActionsReducer,
        TTActionsDialogReducer,
        updateRouteVisit,
        clearMagazinesReducer,
        clearImagesReducer,
        CheckStocksReducer,}  from './Magazines/magazines.reduces';

import {imageReducer,ImageTTActionReducer,productImagesReducer} from './webCam/camera.reducer';
import {ImagesGaleryreducer, TTActionGaleryreducer} from './gallery/gallery.reducer';
import {ordersReducer,
        payFormsReducer,
        initOrder,} from './preOrder/PreOrder.reducer';
import {OrderViewReducer,initOrderByComponent }from './OrdersComponents/orderView.reducer';

import {OrdersWHReducer,OrdersStocksReducer,OrdersMainReducer} from './order/Order.reducer'
import {OrdersSocketReducer,WHSocketReducker} from './store/Socket.reducer'; 
import {StocksProductsReducer,StocksMainReducer} from './stocks/stocks.reducer';
import loader from './loader/loader.reducer';
import ProdAcionsReducer from './prodActions/ProdActions.reducer';


const rootReducer = combineReducers({
  routing: routerReducer,
  isLocalData,
  loadData,
  fullScreanMode,
  showContent,
  Routes:joinReducers(routesReducer,updateRouteVisit),
  Magazines:joinReducers(magazinesReducer,clearMagazinesReducer),
  GPS:geoReducer,
  TTAns: joinReducers(TTAnswersReducer,ImageTTActionReducer,TTActionGaleryreducer),
  All_acts: UserActionsReducer,
  act_dialog : TTActionsDialogReducer,
  Images: joinReducers(imageReducer,ImagesGaleryreducer,clearImagesReducer),
  Orders: joinReducers(ordersReducer,OrderViewReducer,OrdersSocketReducer),
  PayForms:payFormsReducer,
  Stocks: joinReducers(OrdersStocksReducer,StocksMainReducer,CheckStocksReducer),
  order:joinReducers(OrdersMainReducer,initOrder,initOrderByComponent),
  WH :joinReducers(OrdersWHReducer,WHSocketReducker),
  Products: StocksProductsReducer,
  loader,
  ProdActions: ProdAcionsReducer,
  prodImages:productImagesReducer,
});



function  geoReducer (state = {}, action) {
  switch (action.type) {
    case Constances.SAVE_GEO_DATA:
      return Object.assign({},state,action.payload);
    case Constances.REGISTER_GPS:
      return Object.assign({},state,{id:action.payload});
    default:
      return state;
  }
};



function showContent(state = false, action) {
	switch (action.type) {
		case Constances.REHIDRATE_STATE:
			return !state;
		default:
			return state;
  }
}


export default rootReducer;