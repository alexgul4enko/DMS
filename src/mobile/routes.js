import React  from 'react' 
import {IndexRoute, Route, Router} from 'react-router'
import App from "./App";
import Preload from "./preload/Preload";
import Magazines from "./Magazines/Magazines";
import LoadData from "./LoadData/LoadData";
import Home from './home/Home';
import Report from './report/Report';
import Routes_ from './routes/Routes';
import Documents from './documents/Documents';
import Camera from './webCam/Camera';
import Gallery from './gallery/Gallery'
import PreOrder from './preOrder/PreOrder';
import Order from './order/Order';
import Stocks from './stocks/Stocks';
import Loader from './loader/Loader';


export default (
  <Route path="/" component={App}>
    <Route path="Preload" component = {Preload} />
    <Route path="TT/:id" component = {Magazines} />
    <Route path="LoadData" component = {LoadData} />
    <Route path="Home" component = {Home} />
    <Route path="Routes" component = {Routes_} />
    <Route path="DaylyReport" component = {Report} />
    <Route path="Documents" component = {Documents} />
    <Route path="Camera" component = {Camera} />
    <Route path="Gallery" component = {Gallery} />
    <Route path="Orders" component = {PreOrder} />
    <Route path="Order" component = {Order} />
    <Route path="Stocks" component = {Stocks} />
    <Route path="SendData" component = {Loader} />
    
    
  </Route>
);