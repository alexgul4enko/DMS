import React , {Component, PropTypes} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './LoadData.actions'
import './LoadData.css'
import PreloadList from './components/PreloadList'


 class LoadData extends Component {
	render(){
		return (
			<PreloadList {...this.props}/>

		)
	}
	componentWillMount() {
		this.props.initSore();
	}
	componentWillUnmount() {
		this.props.clearStage();	
	}
}


LoadData.propTypes= {
	LoadData: PropTypes.any.isRequired,
	initSore: PropTypes.func.isRequired,
	clearStage:PropTypes.func.isRequired,
}

function mapStateToProps(state= {loadData : []}) {
  return {LoadData: state.loadData};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadData);



