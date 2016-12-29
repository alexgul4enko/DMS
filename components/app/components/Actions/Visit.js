
import React, {PropTypes, Component} from 'react';

import './visit.css'





export default class Visit extends Component {
  constructor(props) {
    super(props);
    this.saveanswer  = this.saveanswer.bind(this);
    this.reject  = this.reject.bind(this);
   
  }
  saveanswer(){
    this.props.saveanswer('-');
  }
  reject(){
    this.props.reject();
  }

  render() {
    return (
          	<div className="Dialog visit" >
               <h1>Записать визит?</h1>
               <div className="buttons">
                  <div className="material-icons reject" onClick = {this.reject} >clear</div>
                  <div className="material-icons check" onClick = {this.saveanswer }>check</div>
               </div>
            </div>	
    );
  }


}
