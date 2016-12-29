import React  from 'react' 
import {IndexRoute, Route, Router} from 'react-router'

import App from "./App";
import Routes from "./Router/Routes"
import Actions from "./TT/TTActions"
// import ProdActions from "../components/app/components/ProdActions"
// import Gallery from "../components/app/components/Gallery"
// import Camera from "../components/app/components/Camera"
// import Orders from "../components/app/components/Orders"
// import OrdersDetails from "../components/app/components/OrdersDetails"
// import LoadData from '../components/app/components/LoadData'






export default (
  <Route path="/" component={App}>
    <Route path="Routes" component = {Routes} />
    <Route path="Actions" component = {Actions} />
  </Route>
);