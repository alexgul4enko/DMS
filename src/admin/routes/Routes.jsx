import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './actions';

class Routes extends Component{
	render (){
		return (<div>Routes Content</div>)
	}
	componentWillMount() {
		// if(!this.props.rou ||  !this.props.rou.length) {
			this.props.initData();
		// }
	}
}

function mapStateToProps(state= {}) {
  return {
  	users : state.myUsers,
    user : state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);