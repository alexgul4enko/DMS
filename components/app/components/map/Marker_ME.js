
import React, {PropTypes, Component} from 'react';
import './my_marker.css'
import FontIcon from 'react-toolbox/lib/font_icon';







export default class Marker_ME extends Component {
  constructor(props) {
    super(props);
   
  }
  

  render() {


    return (
          	<FontIcon className = "MyCurrentPosition" value='fiber_manual_record' />
    );
  }


}






