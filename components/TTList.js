import React from 'react';
import Magazine from "./Magazine"


class TTList extends React.Component {

	constructor(){
		super();
	}

	render(){
			return (
				<div>
					{
						this.props.userlist.map((_magazine)=>{
							return _magazine.matchfilter ? <Magazine 
										key={_magazine.id} 
										magazine={_magazine}
										
										/> : ""
						})
					}
				</div>	
				)
	}
}


export default TTList;