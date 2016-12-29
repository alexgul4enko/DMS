
import React, {PropTypes, Component} from 'react';
var format = require('date-format');
import {Link} from 'react-router'

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
    this.props.selectTT(this.props.data.id);
    //console.log("TT " + this.props.data.id+ ": " + this.props.data.name + " was selected");
    browserHistory.push('Actions');
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
                           {format('dd-MM-yyyy', new Date(this.props.data.visit))}
                   </div>
                   <div className = "Map_row" onClick = {this.setSelectedTT}>{this.props.data.name}</div>
               </div>
           </div>
      )
 
  }


}



