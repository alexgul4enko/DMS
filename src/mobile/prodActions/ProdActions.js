import React , {Component, PropTypes} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './ProdActions.actions'
import './ProdActions.css'
import ProdActionComponent from './components/ProdActionComponent'
import Loading from '../Loading/Loading';

 class ProdActions extends Component {
	render(){
		return this.props.showContent  ? 
				<ProdActionComponent {...this.props}/> :
				<Loading/> 
		

		
	}
	componentWillMount() {
		this.props.clearPhotos();
		this.props.rehidrate();
		const {action, router} = this.props.location.state;
		this.props.initData(action, router);

	}
	componentWillUnmount() {
		let obj= {};
		this.props.ProdActions.map(prod=>{
			const {answers, id } = prod;
			if(answers && Object.keys(answers).length){
				obj[id] = answers;
			}
		})
		const key = this.props.location.state.action.key;
		this.props.writeDatatoDB({id: key,obj})
	}


}




function mapStateToProps(state={}) {
  return {
  	showContent : state.showContent,
  	ProdActions: state.ProdActions,
  	All_acts : state.All_acts,
  	GPS : state.GPS,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProdActions);



