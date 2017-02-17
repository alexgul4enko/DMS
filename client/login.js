import React from 'react';
import ReactDOM from "react-dom";
import App from "../src/login/App";
import { Provider } from 'react-redux'
import configureStore from "../src/login/store"



let initialState = {
  login:"",
  pass:"",
  error:""
}


let store = configureStore(initialState);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById("app"));

