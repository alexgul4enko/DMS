import React , {Component,PropTypes} from 'react';
import StocksComponent from './components/StocksComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './stocks.actions';
import Loading from '../Loading/Loading';

class Stocks extends Component {
	render (){
		return this.props.showContent ? <StocksComponent {...this.props}/>  : <Loading/> ;
	}
	componentWillMount() {
		const Routes = this.props.Routes;
		const route = Routes[Object.keys(Routes)[0]];
		const {id,ttid} = route;
		this.props.rehidrate();
		this.props.initStocks(id,ttid);
	}
	componentWillUnmount() {
		const id = parseInt(Object.keys(this.props.Routes)[0]);

		this.props.cleanData({id,data:this.props.Stocks});
	}
}

Stocks.propTypes = {
	rehidrate : PropTypes.func.isRequired,
	initStocks :  PropTypes.func.isRequired,
}




function mapStateToProps(state = {}) {
	return  {
		products :state.Products,
		showContent: state.showContent,
		Stocks : state.Stocks,
		Routes : state.Routes,

	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stocks);

