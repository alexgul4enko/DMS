import React from 'react';



class Magazine extends React.Component {

	constructor(){
		super();
		
	}


	render(){
			return (
				
				
					<div className = "Magazine">{this.props.magazine.name}</div>
					
				
				)
	}
}


export default Magazine;