import React, { Component } from 'react'
import './load.css'
import LoadHeaders from './LoadHeaders'
import LoadInfo from './LoadInfo'
import LoadButon from './LoadButon'
class Load extends Component {
	constructor(){
		super();
	}

	render(){
		return ( 
			 <div id="loaders">
			 		{
						this.props.data.map((loadInfo, id )=>{
							if(loadInfo.hasOwnProperty("header") ){
								return <LoadHeaders 
											key={id} 
											data={loadInfo}
											/> 
							}
							else if(loadInfo.hasOwnProperty("buton")){
								return <LoadButon 
											key={id} 
											data={loadInfo.buton}
											actions={this.props.actions}
											/> 
							}
							else{
								return <LoadInfo 
											key={id} 
											data={loadInfo}

											/> 
							}
									
						})
					}
			 </div>
		)
	}

}

export default Load;