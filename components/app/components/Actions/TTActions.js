
import React, {PropTypes, Component} from 'react';
import './index.css'






export default class TTActions extends Component {
  constructor(props) {
    super(props);
    this.clickHandler  = this.clickHandler.bind(this);
   
  }

  clickHandler(){
    this.props.click(this.props.action);
  }


  render() {
    return (
          	<div className="TTActionItem" onClick = {this.clickHandler}>
                {this.props.checked 
                          ? <div className="material-icons Check">check_box</div> 
                          : <div className="material-icons">check_box_outline_blank</div>}
                <div>{this.props.question}</div>
            </div>	
    );
  }


}



