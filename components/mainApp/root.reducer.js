import combineReducers  from './combineReducers';
import { routerReducer } from 'react-router-redux';
import routesreducer from './Router/Router.reducer'

const rootReducer = combineReducers({
  routing: routerReducer,
  flow:(state={})=>state,
  prod_action:(state={})=>state,
  prod_action_mult:(state={})=>state,
  ttActions:routesreducer,
  PriceList:(state={})=>state,
  TTProducts:(state={})=>state,
  TTPriceList:(state={})=>state,
  Products:(state={})=>state,
  PayForms:(state={})=>state,
  Magazine:(state={})=>state,
  History:(state={})=>state,
  Actions:(state={})=>state,
  visitInfo:(state={})=>state,
  TTAnswers:(state={})=>state,
  ProductAnswers:(state={})=>state,
  Orders:(state={})=>state,
  
  
});

export default rootReducer;