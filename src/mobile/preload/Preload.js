import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './preload.actions';
import PreloadMenu from './components/PreloadMenu'
import './preload.css'



class  Preload extends Component {
	render(){
		return (
			<PreloadMenu 
				goApp = {this.props.isLocalData}
				toApp = {this.props.goToApp}
				toLoad = {this.props.SyncData}
				/>
		)
	}

	componentWillMount() {
		this.props.initStore();
	}
}


function mapStateToProps(state= {isLocalData : false}) {
  return {isLocalData: state.isLocalData};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Preload);