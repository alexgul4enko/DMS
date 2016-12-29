
import React from 'react';
import ReactDOM from "react-dom";
import App from "../components/preload/components/App";
import { Provider } from 'react-redux'


import configureStore from "../components/preload/redux/store"



let initialState = {
  data:[],
  fullscreen : false
}


let store = configureStore(initialState);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById("app"));