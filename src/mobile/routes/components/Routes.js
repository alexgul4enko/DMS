import React, {Component, PropTypes} from 'react';
import Menu from '../../Menu/Menu';
import RouteFilters from './RouteFilters';
import RouteTabs from './RouteTabs';
import './routes.css'


export default class RoutesComponent extends Component {
	constructor(props){
		super (props);
		this.state = {
			byname :"",
			bydate: null,
		}
		this.textFilter = this.textFilter.bind(this);
		this.dateFilter = this.dateFilter.bind(this);
		this.getMagazinesList = this.getMagazinesList.bind(this);
	}

	getMagazinesList(text, date_){
		if(!this.state.data){
			return [];
		}
		if(!text&& !date_ ){
			return this.state.data.map(magazine=>{
				const {addr,id,ln,lg,name} = magazine;
					return { addr,
						id,
						ln,
						lg,
						name,
						route: magazine.routes[0]
					}
			}); 
		}
		else if(text && !date_){
			return this.state.data.map(magazine=>{
				const {addr,id,ln,lg,name,routes} = magazine;
				if( name.toLowerCase().indexOf(text)>-1 ){
					return { addr,
						id,
						ln,
						lg,
						name,
						route: routes[0]
					}
				}
					
			});
		}
		else if(!text && date_){
			return this.state.data.map(magazine=>{
				const {addr,id,ln,lg,name,routes} = magazine;
				const f_routes = routes.filter(r_r=>{
					return r_r.visit && matchDay(new Date(r_r.visit),date_ )
				});
				if( f_routes.length){
					return { addr,
						id,
						ln,
						lg,
						name,
						route: f_routes[0]
					}
				}
					
			});
		}
		else if(text && date_){
			return this.state.data.map(magazine=>{
				const {addr,id,ln,lg,name,routes} = magazine;
				const f_routes = routes.filter(r_r=>{
					return r_r.visit && matchDay(new Date(r_r.visit),date_ )
				});
				if( f_routes.length && name.toLowerCase().indexOf(text)>-1 ){
					return { addr,
						id,
						ln,
						lg,
						name,
						route: f_routes[0]
					}
				}
					
			});
		}
	
			

	}



	textFilter (evt){
		this.setState({byname:evt.target.value});
	}


	dateFilter(day){
		this.setState({ bydate: day });
	}


	render (){
		const magazines = this.getMagazinesList(this.state.byname.toLowerCase(), this.state.bydate);
		return (
			<div className = "rootComponentContainer">
				<Menu/>
				<div id="app_cont">
					<RouteFilters
						value={this.state.byname}
						dateVal = {this.state.bydate}
						dateFilter ={this.dateFilter}
						textFilter = {this.textFilter}
					/>
					<RouteTabs magazines = {magazines} GPS = {this.props.GPS}/>

				</div>
			</div>

		)
	}
	componentWillMount() {
		this.props.initGpsLocations();
		this.setState({data:bindMagazines(this.props.Magazines,this.props.Routes)});
	}
	
}


function bindMagazines(magazines={},routes = {} ){
	for (let r in routes){
		const {ttid} = routes[r];
		if(magazines[ttid]){
			if(!magazines[ttid].routes){
				magazines[ttid].routes = [routes[r]];
			}
			else{
				magazines[ttid].routes.push(routes[r]);
			}
		}
	}
	let arr = [];
	for (let m in magazines){
		if(magazines[m].routes){
			const routes = magazines[m].routes;
			magazines[m].routes.sort(sortMagazinesList);
			arr.push(magazines[m]);
		}
	}
	arr.sort(sorMagazines);
	return arr;
}



function matchDay(day1 , day2){
	return day1.getYear() == day2.getYear() &&
			day1.getMonth() == day2.getMonth() &&
			day1.getDate() == day2.getDate() ;
};

function sortMagazinesList(a, b) {
  const a_visit = new Date(a.visit);
  const b_visit = new Date(b.visit);
  return a_visit >= b_visit;
};

function sorMagazines(a,b){
	const a_visit = new Date(a.routes[0].visit);
  	const b_visit = new Date(b.routes[0].visit);
  	const a_name = a.name;
  	const b_name = b.name;
  	if(a_visit > b_visit){
  		return 1;
  	}
  	else if(a_visit < b_visit){
		return -1;
  	}
  	else{
  		return a_name >= b_name;
  	}
};












