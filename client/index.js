import React from 'react';
import ReactDOM from "react-dom";
import App from "../components/App";
import { Provider } from 'react-redux'
import $ from 'jquery'

import configureStore from "../redux/store"
import configureUsers from "../redux/store_users"


import httpGetAsync from "../components/load"



//make menu work
var showSlide =  function(element) {
	document.getElementsByClassName("slide-in")[0].classList.remove("slide-in");
	document.getElementById(element.getAttribute("data-ref")).classList.add("slide-in");
	document.getElementById("menu").style.width = "50px";
};
 Array.from(document.getElementsByClassName("menuaction")).map((element) =>{
 	element.onclick  = function(e){showSlide(element)};
 });


 document.getElementById("burger").onclick = function(){
 	if(document.getElementById("menu").clientWidth<100){
 		document.getElementById("menu").style.width = "200px";
 	}
 	else{
 		document.getElementById("menu").style.width = "50px";
 	}
 	
 };
	


let store = configureStore(initialState);


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById("app"));


