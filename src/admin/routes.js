import React  from 'react' 
import { Route, Router} from 'react-router'
import App from "./App";
import about from './about';
import Welcome from './Welcome';
import Users from './users/Users';
import UsersTT from './usersTT/UsersTT';
import Routes from './routes/Routes';

export default (
	<Route path="/AdminPane" component={App}>
		<Route path="MyUsers" component = {Users} />
		<Route path="UserTT" component = {UsersTT} />
		<Route path="UserRoutes" component = {Routes} />
	</Route>
);