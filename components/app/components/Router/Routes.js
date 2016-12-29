
import React, { Component } from 'react'
import actions from "./Routes.actions"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class Routes extends Component {
	constructor(props){
		super(props)
	}

	render (){
		return (
				<div>Hello Routes!))</div>
			)
	}
}





function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);