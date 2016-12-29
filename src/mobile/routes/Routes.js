import React , {Component,PropTypes} from 'react'
import RoutesComponent from './components/Routes'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './routes.actions';
import Loading from '../Loading/Loading';

class Routes extends Component {

	
	render(){
		return this.props.showContent ? <RoutesComponent {...this.props}/>  : <Loading/> ;
	
	}

	componentWillMount() {
		this.props.rehidrate();
		this.props.initStore();

	}


}
Routes.propTypes = {
	rehidrate:PropTypes.func.isRequired,
	initStore:PropTypes.func.isRequired,
	showContent:PropTypes.bool.isRequired,
}





function mapStateToProps(state= {}) {
  return {
  			showContent: state.showContent,
  			Routes : state.Routes,
  			Magazines :state.Magazines,
  			GPS:state.GPS,
  		};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);