import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import actions from './camera.actions';
import CameraComponent from './components/CameraComponent';
import Loading from '../Loading/Loading';
import './camera.css';

class Camera extends Component {

	constructor(props){
		super (props);
		if(props.location && props.location.state
				&& props.location.state.action && 
				props.location.state.action.prodId){
			this.state = {...props.location.state.action}
		}
	}
	render (){
		return this.props.showContent ? <CameraComponent 
											AddProdPhoto = {this.props.AddProdPhoto}
											PhotoAnswer = {this.props.PhotoAnswer}
											CurAction = {this.props.CurAction}
											CurRoute = {this.props.CurRoute}
											Images = {this.props.Images}
											All_acts = {this.props.All_acts}
											Magazine = {this.props.Magazine}
											initGpsLocations = {this.props.initGpsLocations}
											GPS = {this.props.GPS}
											prodImages = {this.props.prodImages}
											PutData  = {this.props.saveImage}
											location = {this.props.location}
											prodAction = {this.state}
										/>  : <Loading/> ;
	}

	componentWillUnmount() {
		
	}

	componentWillMount() {
		this.props.rehidrate();
		if(this.state && this.state.prodId){
			this.props.initProductActions(this.state);
		}
		else{
			this.props.initTTContent(this.props.PhotoAnswer);
		}

		
	}
} 






function mapStateToProps(state= {}, props) {
  const {action,router} = props.location.state || {};
  return {
  		All_acts : state.All_acts[action.act],
  		Magazine: state.Magazines[router.ttid],
  		GPS : state.GPS,
  		PhotoAnswer : state.TTAns[action.key] || null,
  		CurAction : action,
  		CurRoute : router,
  		Images: state.Images,
  		showContent : state.showContent,
  		prodImages : state.prodImages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera);