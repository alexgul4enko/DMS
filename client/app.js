
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import Root from '../src/mobile/Root';
import configureStore from "../src/mobile/store/store";
// import WebDB_Get from '../components/mainApp/WebGet'
import iostore from '../src/mobile/store/configureStore.io'

const store = configureStore();
iostore(store);


render(
	  <Root store={store} history={browserHistory} />,
	  document.getElementById('app'),
	);

// const initialState = {}

// let callback = function (data){
// 	let store = configureStore(data);
// 	console.log(data);
// 	iostore(store);
//   	render(
// 	  <Root store={store} history={browserHistory} />,
// 	  document.getElementById('app'),
// 	);
// }

// let db= new WebDB_Get(callback);
//  db.initDB(initialState);










