
import React, {PropTypes, Component} from 'react';
import './mrker.css'


export default class TTMapsItem extends Component {
  constructor(props) {
    super(props);
    this.showData = this.showData.bind(this);
  }
  showData(){
    this.props.showInfoWindow(this.props.data)
  }

  render() {
    const style = isToday(this.props.data.route.visit)?
                            this.props.data.route.isVisit ?
                              this.props.data.route.reject ?
                                "red":
                              "green":
                            "yelow":
                        "grey";

    return (
          	<div className={`hint_Marker  material-icons ${style}`}
                onClick={this.showData}>
                place
            </div>	
    );
  }

}


function isToday(day=""){
  if(!day) return false;
  const Today = new Date();
  const Thatday = new Date(day);
  return Today.getYear() == Thatday.getYear() 
      && Today.getMonth() == Thatday.getMonth()
      && Today.getDate() == Thatday.getDate();

}


TTMapsItem.propTypes = {
  data:PropTypes.object,
  showInfoWindow:PropTypes.func,

}

