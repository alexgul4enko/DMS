
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
  	
  	const background =  () =>{
    	if (this.props.data.isVisit ===1){
    		return "green"
    	}
    	else if (this.props.data.today){
    		return "yelow"
    	}
    	else {
    		return "red"
    	}
    }
    const classes = 'hint_Marker  material-icons ' + background() ;

    return (
          	<div className={classes}
                onClick={this.showData}>
                location_on
            </div>	
    );
  }


}





/*


 {  this.state.show_data ? 
               

             :  ""}


*/