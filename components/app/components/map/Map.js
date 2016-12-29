import React, { Component} from 'react';
// import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import Places from './places';
import propertis from '../../../../properties'
import TTMapsItem from './TTMapsItem'
import InfoWindow from './InfoWindow'
import Marker_ME from './Marker_ME'



 class MapPage extends Component {

  constructor(props) {
    super(props);
    this.state={
      key : propertis.google_map_key,
      center: [50.511152, 30.497606],
      zoom: 13,
      InfoWindow:null
    }

    this._onChildClick = this._onChildClick.bind(this);
    this.showInfoWindow = this.showInfoWindow.bind(this);
    this.hideData = this.hideData.bind(this);
  }



_onChildClick (key, childProps){
   this.setState({center:[childProps.lat,childProps.lng]});
}



  showInfoWindow (data){
    this.setState({InfoWindow:data});
  }

  hideData(){
    this.setState({InfoWindow:null})
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.IS_GGPS){
      cosole.log(nextProps.IS_GGPS);
      nextState.center =  [nextProps.ln, nextProps.lg];
    }
    return true;
  }


  render() {

    const INFO_WINDOW = this.state.InfoWindow ? 

                  <InfoWindow 
                      key = {0}
                      lat = {this.state.InfoWindow.ln}
                      lng = {this.state.InfoWindow.lg}
                      data = {this.state.InfoWindow}
                      hideData = {this.hideData}
                      selectTT = {this.props.selectTT}
                  />
                  : ""

    return (

       <GoogleMap
          bootstrapURLKeys={{key: this.state.key}} 
          center={this.state.center}
          zoom = {this.state.zoom}
          onBoundsChange={this._onBoundsChange}
          onChildClick={this._onChildClick}
          onClick = {this.hideData}
          
       >
       {
          this.props.data.map((tt)=>{
            if(tt.ln && tt.lg){
                const ZIndex = tt.id==1 ? 99 :1;
                return <TTMapsItem style = {{zIndex: ZIndex}}
                            key={tt.id}
                            lat = {tt.ln}
                            lng = {tt.lg}
                            data = {tt}
                            showInfo = {this.state.InfoWindow ? this.state.InfoWindow.id === tt.id : false}
                            showInfoWindow = {this.showInfoWindow}
                            >
                      </TTMapsItem>
            }
          })
       }
       <Marker_ME lat = {this.props.ln} lng = {this.props.lg}/>
       {INFO_WINDOW}


      </GoogleMap>
    );
  }



  componentDidMount(){
      if (this.props.ln && this.props.lg){
         this.setState({center:[this.props.ln,this.props.lg]});
      }
  }
}




export default MapPage;