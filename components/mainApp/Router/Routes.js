import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from "./Routes.actions"
import { withRouter } from 'react-router';
import RoutesContent from './componnets/RoutesContent'

class Routes extends Component{
	render(){
		return (
				<RoutesContent {...this.props}/>
			)
	}
}





function mapStateToProps(state) {
  return {test:state.Actions};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
	
}
export default connect(mapStateToProps, mapDispatchToProps)(Routes);