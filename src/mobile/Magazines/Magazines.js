import React , {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './magazines.actios';
import MagazineComponent from './components/MagazineComponent';
import Loading from '../Loading/Loading';


class Magazines extends Component {



	render(){
		const { [this.props.params.id] : router } = this.props.Routes;
		return this.props.showContent ? 
								 	<MagazineComponent 
										router = {router}
										tt_ans = {this.props.TTAns}
										pr_ans = {this.props.ProdAns}
										acts = {this.props.All_acts}
										initGpsLocations = {this.props.initGpsLocations}
										dialog = {this.props.act_dialog}
										openDialog = {this.props.openDialog}
										closeDialog = {this.props.closeDialog}
										switchDialog = {this.props.switchDialog}
										saveAnswer = {this.props.saveAnswer}
										Stocks = {this.props.Stocks}
										/>:
									<Loading/>
						

	
	}
	componentWillMount() {
		const id = this.props.params.id;
		const { [this.props.params.id] : router } = this.props.Routes;
		
		const actionsKeys = router.actions.map(data=>{
				const {id} = data; 
				return id;
		})
		this.props.checkStocks(parseInt(id));
		this.props.rehidrate();
		this.props.clearImagesList();
		this.props.clearMagazinesList(router.ttid);
		this.props.clearRoutesList(router.id);
		this.props.initData(actionsKeys);
	}

}




function mapStateToProps(state = {}) {
  return  state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Magazines);
