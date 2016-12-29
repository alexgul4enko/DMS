import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import propertis from '../../../../../properties'
import TTMapsItem from './TTMapsItem'
import InfoWindow from './InfoWindow'
import Marker_ME from './Marker_ME'
import { fitBounds } from 'google-map-react/utils';
import GPS from './GPS_LO';
 class MapPage extends Component {

  constructor(props) {
    super(props);
    this.state={
      key : propertis.google_map_key,
      center: [50.511152, 30.497606],
      zoom: 13,
      InfoWindow:null,
      GPS: false
    }
    this._onChildClick = this._onChildClick.bind(this);
    this.showInfoWindow = this.showInfoWindow.bind(this);
    this.hideData = this.hideData.bind(this);
    this.tongleGPS = this.tongleGPS.bind(this);
    this._onBoundsChange = this._onBoundsChange.bind(this)
  }


  tongleGPS(){
    if(!this.state.GPS){
      this.setState({
                      GPS:!this.state.GPS,
                      center : [this.props.ln,this.props.lg]
                    });
    }
    else{
      this.setState({GPS:!this.state.GPS});
    }
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

  _onBoundsChange(center){
    this.setState({center});
  }
 

  render() {
    const onfoWindow = this.state.InfoWindow ? 
                <InfoWindow 
                    key = {0}
                    lat = {this.state.InfoWindow.ln}
                    lng = {this.state.InfoWindow.lg}
                    data = {this.state.InfoWindow}
                    hideData = {this.hideData}
                    selectTT = {this.props.toRoute}
                />
                : "";
    const markers_ = this.props.data.map(data=>{
        return (data && data.ln &&  data.lg) ? 
                   <TTMapsItem
                      key={data.id}
                      lat={data.ln}
                      lng={data.lg}
                      data = {data}
                      showInfoWindow = {this.showInfoWindow}
                    />:"" 
    });
    return (
      <div className="appUnderTabls">

           <GoogleMap
              ref = {"mapKy"}
              bootstrapURLKeys={{key: this.state.key}} 
              center={this.state.center}
              zoom = {this.state.zoom}
              onClick = {this.hideData}  
              onChildClick = {this._onChildClick}
              onBoundsChange={this._onBoundsChange}
           >
           {markers_}
           {this.props.ln ?<Marker_ME lat = {this.props.ln} lng = {this.props.lg}/> :""}
           {onfoWindow}
          </GoogleMap>
          <GPS tongleGPS={this.tongleGPS}  GPS={this.state.GPS}/>
      </div>
    );
  }



  componentDidMount(){
      if (this.props.ln && this.props.lg){
         this.setState({center:[this.props.ln,this.props.lg]});
      }
  }
}




export default MapPage;


