import React  from 'react' 
import {IndexRoute, Route, Router} from 'react-router'

import App from "./App";
import Routes from "./Router/Routes"
// import Actions from "../components/app/components/Actions"
// import ProdActions from "../components/app/components/ProdActions"
// import Gallery from "../components/app/components/Gallery"
// import Camera from "../components/app/components/Camera"
// import Orders from "../components/app/components/Orders"
// import OrdersDetails from "../components/app/components/OrdersDetails"
// import LoadData from '../components/app/components/LoadData'






export default (
  <Route path="/" component={App}>
    <IndexRoute component={App} />
    <Route path="Routes" component = {Routes} />
  </Route>
);


/*

<Route path="Actions" component = {Actions} />
	<Route path="ProdActions" component = {ProdActions} />
	<Route path="Gallery" component = {Gallery} />
	<Route path="Camera" component = {Camera} />
	<Route path="Orders" component = {Orders} />
	<Route path="OrdersDetails" component = {OrdersDetails} />
	<Route path="LoadData" component = {LoadData} />


*/