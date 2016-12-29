
import React, {PropTypes, Component} from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';







export default class GPS extends Component {
  constructor(props) {
    super(props);
    this.GPS = this.GPS.bind(this);
   
  }
  
  GPS(){
  	this.props.tongleGPS();
  }

  render() {


    return (
          	<FontIcon className = "GPS_TRACKER" 
          	value={this.props.GPS? 'gps_fixed' : 'gps_not_fixed'}
          	onClick = {this.GPS} />
    );
  }


}


