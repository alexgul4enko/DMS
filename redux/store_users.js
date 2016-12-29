import { applyMiddleware, compose, createStore } from 'redux'
import reducer_users from './resucer_users'
import logger from 'redux-logger'



let finalCreateStore = compose(
		applyMiddleware(logger())
	)(createStore)

export default function configureUsers (initialState = { usersList: []}){
	initialState.SelectedUserId = 0;
	return finalCreateStore(reducer_users,initialState);
}