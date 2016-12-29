
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import { browserHistory } from 'react-router'




export default class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.hideData = this.hideData.bind(this);
    this.setSelectedTT = this.setSelectedTT.bind(this);
  }



  hideData(){
    this.props.hideData();
  }
 
  setSelectedTT(){
    this.props.selectTT(this.props.data.route.id);
  }


  render() {
      return(
          
  	       <div 
               className= "MArkerData" 
               > 
               <div className = "relat">
                   <div className="material-icons OUT" onClick={this.hideData}>cancel</div>  
                   <div className = "Map_row date" 
                          onClick = {this.setSelectedTT}>
                           {format(this.props.data.route.visit)}
                   </div>
                   <div className = "Map_row" onClick = {this.setSelectedTT}>{this.props.data.name}</div>
               </div>
           </div>
      )
 
  }


}


function format (date=""){
  if (!date) return "";
  const Thatday = new Date(date);
  return `${Thatday.getYear()+1900}-${Thatday.getMonth()<10 ?
                              '0'+Thatday.getMonth(): Thatday.getMonth()}-${Thatday.getDate()<10 ?
                              '0'+Thatday.getDate(): Thatday.getDate()}`
}



