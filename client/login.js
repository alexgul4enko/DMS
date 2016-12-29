import React from 'react';
import ReactDOM from "react-dom";
import App from "../components/login/components/App";
import { Provider } from 'react-redux'


import configureStore from "../components/login/reducer/store"



// import httpGetAsync from "../components/load"



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

