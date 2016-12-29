import React , {Component,PropTypes} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loading from '../Loading/Loading';
import actions from './PreOrder.actions';
import PreOrderComponent from './components/PreOrderComponent';
import './preOrder.css';



class PreOrder extends Component {
	render(){
		return this.props.showContent ? <PreOrderComponent {...this.props}/>  : <Loading/> ;
	
	}

	componentWillMount() {
		const RID = this.props.location.state;
		const MID = this.props.Routes[RID].ttid;

		this.props.rehidrate();
		this.props.initStore(MID);

	}
}





function mapStateToProps(state= {}) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PreOrder);
