import React, { PropTypes, Component } from 'react';
import GalleryComponent from './components/GalleryComponent';
import './gallery.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './gallery.action';


class Gallery extends Component{
	render(){

		return (
			<GalleryComponent {...this.props}/>
		)
	}

}

function mapStateToProps(state = {}) {
  return  state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);


