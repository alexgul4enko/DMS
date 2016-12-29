import React, {Component, PropTypes} from 'react';
import MagazineListComponent from './MagazineListComponent'


export default class MagazinesList extends  Component{



	render(){
		const magazines = this.props.magazines.map((data, key)=>{

			return data ? <MagazineListComponent
							key={key}
							name = {data.name}
							addr= {data.addr}
							visit = {data.visit}
							isVisit = {data.route.isVisit}
							visitDate = {data.route.visit}
							id = {data.route.id}
							reject = {data.route.reject}
							toRoute = {this.props.toRoute}
							/>:"";
		});

		return(
			<div className = "appUnderTabls">
				{magazines}
			</div>
		)
	}
}

MagazinesList.propsTypes = {

}
